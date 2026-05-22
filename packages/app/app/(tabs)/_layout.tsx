import { Text } from 'react-native';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { BottomNavbar, BottomNavbarProvider } from '@/components/bottom-navbar';

import type { Href } from 'expo-router';

export default function TabsLayout() {
  return (
    <BottomNavbarProvider>
      <Tabs style={{ flex: 1 }}>
        <TabSlot style={{ flex: 1 }} />
        <BottomNavbar />
        <TabList style={{ display: 'none' }}>
          <TabTrigger name="home" href={'/home' as Href}>
            <Text>Home</Text>
          </TabTrigger>
          <TabTrigger name="groups" href={'/groups' as Href}>
            <Text>Groups</Text>
          </TabTrigger>
          <TabTrigger name="events" href={'/events' as Href}>
            <Text>Events</Text>
          </TabTrigger>
          <TabTrigger name="settings" href={'/settings' as Href}>
            <Text>Settings</Text>
          </TabTrigger>
        </TabList>
      </Tabs>
    </BottomNavbarProvider>
  );
}
