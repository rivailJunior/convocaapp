import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import type { AttendancePlayer, Team } from '@sportspay/shared';

// Instagram Stories: 1080×1920 (9:16). Preview scaled to fit on screen.
const STORY_WIDTH = 320;
const STORY_HEIGHT = Math.round(STORY_WIDTH * (16 / 9)); // 569

const STORY_CARD_COLORS = {
  GRADIENT_START: '#1B5E20',
  GRADIENT_MID: '#2E7D32',
  GRADIENT_END: '#388E3C',
  TEAM_CARD_BG: 'rgba(255, 255, 255, 0.12)',
  PLAYER_NUMBER_BG: 'rgba(255, 255, 255, 0.2)',
  BADGE_BG: 'rgba(255, 255, 255, 0.15)',
  WHITE: '#FFFFFF',
  WHITE_70: 'rgba(255, 255, 255, 0.7)',
  WHITE_40: 'rgba(255, 255, 255, 0.4)',
} as const;

type TeamStoryCardProps = {
  eventTitle: string;
  team: Team;
  isBench?: boolean;
};

export function TeamStoryCard({
  eventTitle,
  team,
  isBench = false,
}: TeamStoryCardProps): React.JSX.Element {
  const textColor = isBench ? STORY_CARD_COLORS.WHITE_70 : STORY_CARD_COLORS.WHITE;
  const _dotColor = isBench ? STORY_CARD_COLORS.WHITE_70 : STORY_CARD_COLORS.WHITE;
  const numberTextColor = isBench ? STORY_CARD_COLORS.WHITE_70 : STORY_CARD_COLORS.WHITE;

  return (
    <LinearGradient
      colors={[
        STORY_CARD_COLORS.GRADIENT_START,
        STORY_CARD_COLORS.GRADIENT_MID,
        STORY_CARD_COLORS.GRADIENT_END,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: STORY_WIDTH,
        height: STORY_HEIGHT,
        borderRadius: 24,
        padding: 20,
        overflow: 'hidden',
      }}
    >
      {/* Header: badge + icon */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          width: '100%',
          justifyContent: 'flex-end',
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: STORY_CARD_COLORS.BADGE_BG,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: STORY_CARD_COLORS.WHITE,
              fontSize: 10,
              fontWeight: '800',
              letterSpacing: 1.5,
            }}
          >
            {eventTitle}
          </Text>
        </View>
        {/* <Text style={{ fontSize: 24 }}>⚽</Text> */}
      </View>

      {/* Event title */}
      <View style={{ alignItems: 'flex-start', marginBottom: 10, width: '100%' }}>
        <Text
          style={{
            color: STORY_CARD_COLORS.WHITE,
            fontSize: 24,
            fontWeight: '900',
            textAlign: 'left',
            textTransform: 'capitalize',
            letterSpacing: 2,
            lineHeight: 30,
          }}
        >
          {team.name}
        </Text>
      </View>

      {/* Divider */}
      {/* <View
        style={{
          height: 1,
          backgroundColor: STORY_CARD_COLORS.WHITE_40,
          marginBottom: 20,
          marginHorizontal: 24,
        }}
      /> */}

      {/* Team block */}
      <View
        style={{
          backgroundColor: STORY_CARD_COLORS.TEAM_CARD_BG,
          borderRadius: 16,
          padding: 16,
          flex: 1,
        }}
      >
        {/* Team name header */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          {' '}
          <Text
            style={{
              color: textColor,
              fontSize: 20,
              fontWeight: '800',
              textTransform: 'capitalize',
              letterSpacing: 2,
            }}
          >
            {team.name}
          </Text>
        </View> */}

        {/* Players */}
        <View style={{ gap: 10 }}>
          {team.players.map((player: AttendancePlayer, playerIndex: number) => (
            <View
              key={player.userId}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: STORY_CARD_COLORS.PLAYER_NUMBER_BG,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: numberTextColor, fontSize: 11, fontWeight: '700' }}>
                  {String(playerIndex + 1).padStart(2, '0')}
                </Text>
              </View>
              <Text style={{ color: textColor, fontSize: 15, fontWeight: '600' }}>
                {player.userName}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer branding */}
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text
          style={{
            color: STORY_CARD_COLORS.WHITE_40,
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 1,
          }}
        >
          🏟️ Compartilhado via Convoca
        </Text>
      </View>
    </LinearGradient>
  );
}
