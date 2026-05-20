import { PanResponder } from 'react-native';
import { useEffect, useRef, useState } from 'react';

import type { DragListItem } from '@sportspay/shared';
import type { PanResponderInstance } from 'react-native';

type UseDragListProps = {
  items: DragListItem[];
  itemHeight: number;
  onReorder: (items: DragListItem[]) => void;
};

type UseDragListReturn = {
  dragIndex: number | null;
  hoverIndex: number | null;
  dragY: number | null;
  panResponders: PanResponderInstance[];
};

export function useDragList({ items, itemHeight, onReorder }: UseDragListProps): UseDragListReturn {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [dragY, setDragY] = useState<number | null>(null);

  const dragIndexRef = useRef<number | null>(null);
  const hoverIndexRef = useRef<number | null>(null);
  const startYRef = useRef<number>(0);
  const itemsRef = useRef<DragListItem[]>(items);
  const onReorderRef = useRef<(items: DragListItem[]) => void>(onReorder);
  const itemHeightRef = useRef<number>(itemHeight);
  const panRespondersRef = useRef<PanResponderInstance[]>([]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    onReorderRef.current = onReorder;
  }, [onReorder]);

  useEffect(() => {
    itemHeightRef.current = itemHeight;
  }, [itemHeight]);

  useEffect(() => {
    panRespondersRef.current = items.map((_, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          const h = itemHeightRef.current;
          startYRef.current = index * h;
          dragIndexRef.current = index;
          hoverIndexRef.current = index;
          setDragIndex(index);
          setHoverIndex(index);
          setDragY(startYRef.current);
        },

        onPanResponderMove: (_, gestureState) => {
          const h = itemHeightRef.current;
          const currentY = startYRef.current + gestureState.dy;
          setDragY(currentY);

          const newHover = Math.min(
            Math.max(Math.round(currentY / h), 0),
            itemsRef.current.length - 1,
          );

          if (newHover !== hoverIndexRef.current) {
            hoverIndexRef.current = newHover;
            setHoverIndex(newHover);
          }
        },

        onPanResponderRelease: () => {
          const from = dragIndexRef.current;
          const to = hoverIndexRef.current;

          if (from !== null && to !== null && from !== to) {
            const reordered = [...itemsRef.current];
            const [moved] = reordered.splice(from, 1);
            reordered.splice(to, 0, moved);
            onReorderRef.current(reordered);
          }

          dragIndexRef.current = null;
          hoverIndexRef.current = null;
          setDragIndex(null);
          setHoverIndex(null);
          setDragY(null);
        },

        onPanResponderTerminate: () => {
          dragIndexRef.current = null;
          hoverIndexRef.current = null;
          setDragIndex(null);
          setHoverIndex(null);
          setDragY(null);
        },
      }),
    );
  }, [items.length]);

  return { dragIndex, hoverIndex, dragY, panResponders: panRespondersRef.current };
}
