import { Search } from 'lucide-react-native';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

import { useAttendanceList } from '@sportspay/shared';

import { PageContainer } from '../page-container';
import { AttendanceBottomBar } from './components/AttendanceBottomBar';
import { AttendanceFilterChips } from './components/AttendanceFilterChips';
import { AttendanceRow } from './components/AttendanceRow';

import type { Attendance, AttendanceStatus } from '@sportspay/shared';

type AttendanceListPageProps = {
  eventId: string;
};

export function AttendanceListPage({ eventId }: AttendanceListPageProps): React.JSX.Element {
  const {
    attendances,
    filter,
    counts,
    isGenerateWithConfirmed,
    setFilter,
    setIsGenerateWithConfirmed,
    updateAttendanceStatus,
  } = useAttendanceList(eventId);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const filteredAttendances = searchQuery
    ? attendances.filter((a) => a.userName.toLowerCase().includes(searchQuery.toLowerCase()))
    : attendances;

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleToggleSearch = (): void => {
    setIsSearchVisible((prev) => !prev);
    if (isSearchVisible) {
      setSearchQuery('');
    }
  };

  const handleStatusChange = (userId: string, status: AttendanceStatus): void => {
    updateAttendanceStatus(userId, status);
  };

  const handleNavigateToTeams = (): void => {
    router.push({
      pathname: '/generate-teams/[id]',
      params: { id: eventId },
    });
  };

  const renderItem = ({ item }: { item: Attendance }): React.JSX.Element => (
    <AttendanceRow attendance={item} onStatusChange={handleStatusChange} />
  );

  const keyExtractor = (item: Attendance): string => item.userId;

  return (
    <PageContainer title="Lista de Presença" onBack={handleBack}>
      <View className="flex-1">
        <View className="flex-row items-center justify-end px-4 pt-2">
          <Pressable
            onPress={handleToggleSearch}
            className="p-2 rounded-full active:opacity-70"
            accessibilityLabel="Buscar participante"
          >
            <Search size={22} color="#595c5d" />
          </Pressable>
        </View>

        {isSearchVisible && (
          <View className="px-4 pb-2">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar participante..."
              placeholderTextColor="#595c5d"
              className="bg-surface-container-low rounded-xl px-4 py-3 text-on-surface text-sm font-body"
              autoFocus
            />
          </View>
        )}

        <AttendanceFilterChips activeFilter={filter} counts={counts} onFilterChange={setFilter} />

        <FlatList
          data={filteredAttendances}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerClassName="px-4 pb-48 gap-2"
          showsVerticalScrollIndicator={false}
        />

        <AttendanceBottomBar
          isGenerateWithConfirmed={isGenerateWithConfirmed}
          onToggleGenerate={setIsGenerateWithConfirmed}
          onNavigateToTeams={handleNavigateToTeams}
        />
      </View>
    </PageContainer>
  );
}
