import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import type { TeamDrawResult } from '@sportspay/shared';

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

type EventStoryCardProps = {
  eventTitle: string;
  result: TeamDrawResult;
};

export function EventStoryCard({ eventTitle, result }: EventStoryCardProps): React.JSX.Element {
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
        width: 360,
        minHeight: 640,
        borderRadius: 24,
        padding: 24,
        overflow: 'hidden',
      }}
    >
      {/* Header: badge + icon */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
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
            CONVOCA EXCLUSIVE
          </Text>
        </View>
        <Text style={{ fontSize: 24 }}>⚽</Text>
      </View>

      {/* Event title */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Text
          style={{
            color: STORY_CARD_COLORS.WHITE,
            fontSize: 32,
            fontWeight: '900',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 2,
            lineHeight: 38,
          }}
        >
          {eventTitle}
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: STORY_CARD_COLORS.WHITE_40,
          marginBottom: 24,
          marginHorizontal: 40,
        }}
      />

      {/* Teams */}
      <View style={{ gap: 16 }}>
        {result.teams.map((team) => (
          <View
            key={team.id}
            style={{
              backgroundColor: STORY_CARD_COLORS.TEAM_CARD_BG,
              borderRadius: 16,
              padding: 16,
            }}
          >
            {/* Team name header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: STORY_CARD_COLORS.WHITE,
                }}
              />
              <Text
                style={{
                  color: STORY_CARD_COLORS.WHITE,
                  fontSize: 13,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}
              >
                {team.name}
              </Text>
            </View>

            {/* Players */}
            <View style={{ gap: 10 }}>
              {team.players.map((player, playerIndex) => (
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
                    <Text
                      style={{ color: STORY_CARD_COLORS.WHITE, fontSize: 11, fontWeight: '700' }}
                    >
                      {String(playerIndex + 1).padStart(2, '0')}
                    </Text>
                  </View>
                  <Text style={{ color: STORY_CARD_COLORS.WHITE, fontSize: 15, fontWeight: '600' }}>
                    {player.userName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Bench */}
        {result.bench.length > 0 && (
          <View
            style={{
              backgroundColor: STORY_CARD_COLORS.TEAM_CARD_BG,
              borderRadius: 16,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: STORY_CARD_COLORS.WHITE_70,
                }}
              />
              <Text
                style={{
                  color: STORY_CARD_COLORS.WHITE_70,
                  fontSize: 13,
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}
              >
                Banco
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              {result.bench.map((player, i) => (
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
                    <Text
                      style={{ color: STORY_CARD_COLORS.WHITE_70, fontSize: 11, fontWeight: '700' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                  </View>
                  <Text
                    style={{ color: STORY_CARD_COLORS.WHITE_70, fontSize: 15, fontWeight: '600' }}
                  >
                    {player.userName}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Footer branding */}
      <View style={{ alignItems: 'center', marginTop: 24, paddingBottom: 8 }}>
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
