import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Camera, Copy, Images, MessageCircle, Share2 } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, Share, Text, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

import { PageContainer } from '../page-container';

import { TeamStoryCard } from './TeamStoryCard';

import type { Team, TeamDrawResult } from '@sportspay/shared';

type ShareTeamsPageProps = {
  eventTitle: string;
  result: TeamDrawResult;
};

const TEAM_COLORS = [
  { dot: 'bg-primary', label: 'text-primary' },
  { dot: 'bg-tertiary', label: 'text-tertiary' },
  { dot: 'bg-error-container', label: 'text-error-container' },
  { dot: 'bg-secondary', label: 'text-secondary' },
  { dot: 'bg-blue-500', label: 'text-blue-500' },
  { dot: 'bg-purple-500', label: 'text-purple-500' },
];

const buildShareMessage = (eventTitle: string, result: TeamDrawResult): string => {
  const lines: string[] = [`⚽ *${eventTitle}*`, ''];

  result.teams.forEach((team) => {
    lines.push(`*${team.name}:*`);
    team.players.forEach((p, i) => {
      lines.push(`${String(i + 1).padStart(2, '0')}. ${p.userName}`);
    });
    lines.push('');
  });

  if (result.bench.length > 0) {
    lines.push('*Banco:*');
    result.bench.forEach((p, i) => {
      lines.push(`${String(i + 1).padStart(2, '0')}. ${p.userName}`);
    });
    lines.push('');
  }

  lines.push('🏟️ Compartilhado via SportsPay');

  return lines.join('\n');
};

type CarouselItem = {
  key: string;
  team: Team;
  isBench: boolean;
};

const CARD_WIDTH = 300;
const CARD_GAP = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
const HORIZONTAL_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export function ShareTeamsPage({ eventTitle, result }: ShareTeamsPageProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const cardRefs = useRef<(ViewShot | null)[]>([]);

  const shareMessage = useMemo(() => buildShareMessage(eventTitle, result), [eventTitle, result]);

  const carouselItems = useMemo<CarouselItem[]>(() => {
    const items: CarouselItem[] = result.teams.map((team) => ({
      key: team.id,
      team,
      isBench: false,
    }));

    if (result.bench.length > 0) {
      items.push({
        key: 'bench',
        team: { id: 'bench', name: 'Banco', players: result.bench },
        isBench: true,
      });
    }

    return items;
  }, [result]);

  const handleBack = useCallback(() => {
    try {
      router.back();
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    await Clipboard.setStringAsync(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [shareMessage]);

  const handleShareWhatsApp = useCallback(async () => {
    try {
      await Share.share({ title: eventTitle, message: shareMessage }, { dialogTitle: eventTitle });
    } catch (error: unknown) {
      if (__DEV__) console.warn('Error sharing', error);
    }
  }, [eventTitle, shareMessage]);

  const handleShareCurrentCard = useCallback(async () => {
    try {
      const ref = cardRefs.current[activeIndex];
      const uri = await ref?.capture?.();
      if (!uri) return;

      await Sharing.shareAsync(`file://${uri}`, {
        mimeType: 'image/png',
        dialogTitle: eventTitle,
      });
    } catch (error: unknown) {
      if (__DEV__) console.warn('Error sharing card', error);
    } finally {
      setShowShareMenu(false);
    }
  }, [eventTitle, activeIndex]);

  const handleShareAllCards = useCallback(async () => {
    try {
      const uris: string[] = [];
      for (const ref of cardRefs.current) {
        const uri = await ref?.capture?.();
        if (uri) uris.push(`file://${uri}`);
      }
      if (uris.length === 0) return;

      for (const uri of uris) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: eventTitle,
        });
      }
    } catch (error: unknown) {
      if (__DEV__) console.warn('Error sharing all cards', error);
    } finally {
      setShowShareMenu(false);
    }
  }, [eventTitle]);

  const handleSetCardRef = useCallback((index: number, ref: ViewShot | null) => {
    cardRefs.current[index] = ref;
  }, []);

  return (
    <PageContainer title="Compartilhar Times" onBack={handleBack}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* WhatsApp text section */}
        <View className="pt-6 mb-6 px-4">
          <Text className="font-headline font-bold text-lg text-on-surface mb-1">
            Texto para WhatsApp
          </Text>
          <Text className="text-sm text-on-surface-variant mb-4">Mensagem Formatada</Text>

          <View className="bg-surface-container rounded-xl p-4 mb-4 border border-outline-variant/10">
            <Text className="font-mono text-sm leading-relaxed text-on-surface">
              {shareMessage}
            </Text>
          </View>

          <Pressable
            onPress={handleCopy}
            className="flex-row items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-outline-variant/30 active:scale-[0.98]"
          >
            <Copy size={18} color="#595c5d" />
            <Text className="text-sm font-semibold text-on-surface-variant">
              {copied ? 'Copiado!' : 'Copiar Texto'}
            </Text>
          </Pressable>
        </View>

        {/* Imagem do Evento — horizontal carousel */}
        <View className="mb-6 px-4">
          <Text className="font-headline font-bold text-lg text-on-surface mb-1">
            Imagem do Evento
          </Text>
          <Text className="text-sm text-on-surface-variant mb-4">Deslize para ver cada time</Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <FlatList
            data={carouselItems}
            keyExtractor={(item) => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: HORIZONTAL_PADDING,
            }}
            ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / SNAP_INTERVAL);
              setActiveIndex(Math.max(0, Math.min(index, carouselItems.length - 1)));
            }}
            renderItem={({ item, index }) => (
              <ViewShot
                ref={(ref) => handleSetCardRef(index, ref)}
                options={{ format: 'png', quality: 1 }}
              >
                <TeamStoryCard eventTitle={eventTitle} team={item.team} isBench={item.isBench} />
              </ViewShot>
            )}
          />

          {/* Dot indicators */}
          <View className="flex-row justify-center gap-2 mt-4">
            {carouselItems.map((item, index) => (
              <View
                key={item.key}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-primary' : 'bg-outline-variant/40'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Teams visual preview */}
        <View className="mb-6 px-4">
          <Text className="font-headline font-bold text-lg text-on-surface mb-1">Times</Text>
          <Text className="text-sm text-on-surface-variant mb-4">
            {result.totalPlayers} jogadores em {result.teams.length} times
          </Text>

          <View className="gap-4">
            {result.teams.map((team, teamIndex) => {
              const style = TEAM_COLORS[teamIndex % TEAM_COLORS.length]!;
              return (
                <View
                  key={team.id}
                  className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10"
                >
                  <View className="flex-row items-center gap-2 mb-3">
                    <View className={`w-3 h-3 rounded-full ${style.dot}`} />
                    <Text
                      className={`font-headline font-bold text-sm uppercase tracking-widest ${style.label}`}
                    >
                      {team.name}
                    </Text>
                  </View>
                  <View className="gap-2.5">
                    {team.players.map((player, playerIndex) => (
                      <View key={player.userId} className="flex-row items-center gap-3">
                        <View className="w-7 h-7 rounded-full bg-surface-container items-center justify-center">
                          <Text className="text-[10px] font-bold text-on-surface-variant">
                            {String(playerIndex + 1).padStart(2, '0')}
                          </Text>
                        </View>
                        <Text className="text-sm font-medium text-on-surface">
                          {player.userName}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}

            {result.bench.length > 0 && (
              <View className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10">
                <View className="flex-row items-center gap-2 mb-3">
                  <View className="w-3 h-3 rounded-full bg-outline-variant" />
                  <Text className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant">
                    Banco
                  </Text>
                </View>
                <View className="gap-2.5">
                  {result.bench.map((player, i) => (
                    <View key={player.userId} className="flex-row items-center gap-3">
                      <View className="w-7 h-7 rounded-full bg-surface-container items-center justify-center">
                        <Text className="text-[10px] font-bold text-on-surface-variant">
                          {String(i + 1).padStart(2, '0')}
                        </Text>
                      </View>
                      <Text className="text-sm font-medium text-on-surface-variant">
                        {player.userName}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-4 bg-surface/80 rounded-t-[24px] shadow-sm">
        {/* Share menu overlay — positioned above the buttons */}
        {showShareMenu && (
          <View
            className="absolute left-4 right-4 bg-surface-container rounded-xl border border-outline-variant/20 overflow-hidden"
            style={{ bottom: 80 }}
          >
            <Pressable
              onPress={handleShareCurrentCard}
              className="flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-container-highest"
            >
              <Camera size={18} color="#595c5d" />
              <Text className="text-sm font-semibold text-on-surface">Compartilhar Time Atual</Text>
            </Pressable>
            <View className="h-px bg-outline-variant/20" />
            <Pressable
              onPress={handleShareAllCards}
              className="flex-row items-center gap-3 px-4 py-3.5 active:bg-surface-container-highest"
            >
              <Images size={18} color="#595c5d" />
              <Text className="text-sm font-semibold text-on-surface">Compartilhar Todos</Text>
            </Pressable>
          </View>
        )}

        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={handleShareWhatsApp}
            className="flex-1 flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary active:scale-[0.98]"
          >
            <MessageCircle size={20} color="#fff" />
            <Text className="text-[11px] font-bold text-white">WhatsApp</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowShareMenu((prev) => !prev)}
            className="flex-1 flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary active:scale-[0.98]"
          >
            <Share2 size={20} color="#fff" />
            <Text className="text-[11px] font-bold text-white">Compartilhar</Text>
          </Pressable>
        </View>
      </View>
    </PageContainer>
  );
}
