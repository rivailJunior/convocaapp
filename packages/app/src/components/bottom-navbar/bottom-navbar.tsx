import { CalendarDays, Home, Settings, Users } from 'lucide-react-native';
import { Text, View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { TabTrigger } from 'expo-router/ui';



import { BottomNavbarActions } from './bottom-navbar-actions';
import { useBottomNavbar } from './bottom-navbar-context';

import type { ComponentType } from 'react';

interface TabItem {
  name: string;
  href: string;
  label: string;
  icon: ComponentType<{ size: number; color: string; strokeWidth: number }>;
}

const TAB_ITEMS: TabItem[] = [
  { name: 'home', href: '/home', label: 'Home', icon: Home },
  { name: 'groups', href: '/groups', label: 'Groups', icon: Users },
  { name: 'events', href: '/events', label: 'Events', icon: CalendarDays },
  { name: 'settings', href: '/settings', label: 'Settings', icon: Settings },
];

const BottomNavbar = () => {
  const { actions } = useBottomNavbar();
  // const insets = useSafeAreaInsets();
  const pathname = usePathname();

  if (actions && actions.length > 0) {
    return <BottomNavbarActions actions={actions} />;
  }

  return (
    <View className="justify-center pb-6 bg-black">
      <View className="flex flex-row items-center bg-blue-400">
        {TAB_ITEMS.map((tab) => {
          const isFocused = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <TabTrigger
              key={tab.name}
              name={tab.name}
              className="flex-1 bg-red-500"
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={tab.label}
            >
              <View className={`flex-col items-center align-middle justify-center  rounded-md`}>
                <View className={`items-center justify-center rounded-full px-5 py-1`}>
                  <Icon
                    size={22}
                    color={isFocused ? 'black' : '#757778'}
                    strokeWidth={isFocused ? 2 : 1.5}
                  />
                </View>
                <Text
                  className={`text-xs font-label ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`}
                >
                  {tab.label}
                </Text>
              </View>
            </TabTrigger>
          );
        })}
      </View>
    </View>
  );
};

export { BottomNavbar };
