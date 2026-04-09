import { router } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROUTES } from '@/navigation';

import { PrimaryButton } from '../primary-button';
import { PageIndicator } from './components/PageIndicator';
import { OnboardingOrganize } from './OnboardingOrganize';
import { OnboardingShare } from './OnboardingShare';
import { OnboardingTeams } from './OnboardingTeams';

import type { ViewToken } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  { key: 'organize', component: OnboardingOrganize },
  { key: 'teams', component: OnboardingTeams },
  { key: 'share', component: OnboardingShare },
] as const;

const TOTAL_SLIDES = SLIDES.length;

export const OnboardingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const isLastSlide = activeIndex === TOTAL_SLIDES - 1;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (isLastSlide) {
      router.push(ROUTES.HOME);
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex + 1,
      animated: true,
    });
  };

  const handleBack = () => {
    if (activeIndex === 0) {
      router.back();
      return;
    }
    flatListRef.current?.scrollToIndex({
      index: activeIndex - 1,
      animated: true,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 h-14">
        <Pressable onPress={handleBack} className="items-center justify-center active:opacity-70">
          {activeIndex > 0 && <ChevronLeft size={36} color="#000" />}
        </Pressable>
        <Pressable onPress={() => router.push(ROUTES.HOME)} className="active:opacity-70">
          <Text className="text-on-surface-variant text-lg">Pular</Text>
        </Pressable>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <ScrollView style={{ width: SCREEN_WIDTH }} showsVerticalScrollIndicator={false}>
            <item.component />
          </ScrollView>
        )}
      />

      {/* Bottom Action Area */}
      <View className="absolute bottom-0 left-0 right-0 px-6 pb-12 pt-6">
        <View className="items-center gap-8">
          <PageIndicator total={TOTAL_SLIDES} activeIndex={activeIndex} />

          {/* Primary Action Button */}
          <PrimaryButton
            label={isLastSlide ? 'Começar' : 'Próximo'}
            onPress={handleNext}
            icon={<ChevronRight size={24} color="#fff" />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
