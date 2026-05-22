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
    <View className="justify-center p-4 bg-white">
      <View className="flex flex-row  w-full justify-around">
        {TAB_ITEMS.map((tab) => {
          const isFocused = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <TabTrigger
              key={tab.name}
              name={tab.name}
              className="justify-center items-center"
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={tab.label}
            >
              <View
                className={`flex-col items-center align-middle justify-center rounded-md gap-2`}
              >
                <View className={`items-center justify-center rounded-full `}>
                  <Icon
                    size={30}
                    color={isFocused ? '#324600' : '#757778'}
                    strokeWidth={isFocused ? 1.5 : 1}
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
