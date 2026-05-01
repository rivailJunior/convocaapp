import { Check, HelpCircle, X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import type { AttendanceStatus } from '@sportspay/shared';

type AttendanceStatusButtonsProps = {
  status: AttendanceStatus;
  onStatusChange: (status: AttendanceStatus) => void;
};

const ICON_SIZE = 16;
const ACTIVE_ICON_COLOR = '#ffffff';
const INACTIVE_ICON_COLOR = '#595c5d';

export function AttendanceStatusButtons({
  status,
  onStatusChange,
}: AttendanceStatusButtonsProps): React.JSX.Element {
  const isConfirmed = status === 'confirmed';
  const isPending = status === 'pending' || status === 'maybe';
  const isDeclined = status === 'declined';

  return (
    <View className="flex-row items-center bg-surface-container rounded-lg p-1 gap-1">
      <Pressable
        onPress={() => onStatusChange('confirmed')}
        accessibilityLabel="Confirmar presença"
        className={`w-8 h-8 items-center justify-center rounded-md ${
          isConfirmed ? 'bg-primary' : ''
        }`}
      >
        <Check
          size={ICON_SIZE}
          color={isConfirmed ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
          strokeWidth={isConfirmed ? 3 : 2}
        />
      </Pressable>

      <Pressable
        onPress={() => onStatusChange('maybe')}
        accessibilityLabel="Talvez"
        className={`w-8 h-8 items-center justify-center rounded-md ${
          isPending ? 'bg-error-container' : ''
        }`}
      >
        <HelpCircle size={ICON_SIZE} color={isPending ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
      </Pressable>

      <Pressable
        onPress={() => onStatusChange('declined')}
        accessibilityLabel="Recusar"
        className={`w-8 h-8 items-center justify-center rounded-md ${isDeclined ? 'bg-error' : ''}`}
      >
        <X
          size={ICON_SIZE}
          color={isDeclined ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}
          strokeWidth={isDeclined ? 3 : 2}
        />
      </Pressable>
    </View>
  );
}
