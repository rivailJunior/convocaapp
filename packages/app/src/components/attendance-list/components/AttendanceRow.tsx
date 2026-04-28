import { Image, Text, View } from 'react-native';

import { AttendanceStatusButtons } from './AttendanceStatusButtons';

import type { Attendance, AttendanceStatus } from '@sportspay/shared';

type AttendanceRowProps = {
  attendance: Attendance;
  onStatusChange: (userId: string, status: AttendanceStatus) => void;
};

const STATUS_ROW_STYLES: Record<AttendanceStatus, string> = {
  confirmed: 'bg-primary/5 border-primary/10',
  pending: 'bg-error-container/5 border-error-container/10',
  maybe: 'bg-error-container/5 border-error-container/10',
  declined: 'bg-error/5 border-error/10',
};

const formatRespondedAt = (respondedAt?: string): string => {
  if (!respondedAt) return 'Aguardando resposta';
  const date = new Date(respondedAt);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `Confirmado às ${hours}:${minutes}`;
};

const getStatusLabel = (attendance: Attendance): string => {
  if (attendance.status === 'confirmed') {
    return formatRespondedAt(attendance.respondedAt);
  }
  if (attendance.status === 'declined') {
    return attendance.note ? `Recusou: ${attendance.note}` : 'Recusou';
  }
  if (attendance.status === 'maybe') {
    return 'Talvez';
  }
  return 'Aguardando resposta';
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export function AttendanceRow({
  attendance,
  onStatusChange,
}: AttendanceRowProps): React.JSX.Element {
  const rowStyle = STATUS_ROW_STYLES[attendance.status];
  const initials = getInitials(attendance.userName);
  const statusLabel = getStatusLabel(attendance);

  const handleStatusChange = (status: AttendanceStatus): void => {
    onStatusChange(attendance.userId, status);
  };

  return (
    <View className={`p-3 rounded-xl flex-row items-center justify-between border ${rowStyle}`}>
      <View className="flex-row items-center gap-3 flex-1">
        {attendance.avatarUrl ? (
          <Image
            source={{ uri: attendance.avatarUrl }}
            className="w-10 h-10 rounded-full"
            accessibilityLabel={attendance.userName}
          />
        ) : (
          <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
            <Text className="text-primary font-bold text-sm">{initials}</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="font-semibold text-on-surface">{attendance.userName}</Text>
          <Text className="text-xs text-on-surface-variant">{statusLabel}</Text>
        </View>
      </View>

      <AttendanceStatusButtons status={attendance.status} onStatusChange={handleStatusChange} />
    </View>
  );
}
