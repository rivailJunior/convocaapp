import { useLocalSearchParams } from 'expo-router';
import { AttendanceListPage } from '@/components/attendance-list';

export default function AttendanceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <AttendanceListPage eventId={id} />;
}
