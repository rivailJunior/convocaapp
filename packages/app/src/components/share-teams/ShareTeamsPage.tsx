import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { Camera, Copy, MessageCircle } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Share, Text, View } from 'react-native';
import ViewShot from 'react-native-view-shot';

import { PageContainer } from '../page-container';

import { EventStoryCard } from './EventStoryCard';

import type { TeamDrawResult } from '@sportspay/shared';

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

export function ShareTeamsPage({ eventTitle, result }: ShareTeamsPageProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const storyCardRef = useRef<ViewShot>(null);

  const shareMessage = useMemo(() => buildShareMessage(eventTitle, result), [eventTitle, result]);

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

  const handleShareInstagram = useCallback(async () => {
    try {
      const uri = await storyCardRef.current?.capture?.();
      if (!uri) return;

      await Sharing.shareAsync(`file://${uri}`, {
        mimeType: 'image/png',
        dialogTitle: eventTitle,
      });
    } catch (error: unknown) {
      if (__DEV__) console.warn('Error sharing to Instagram', error);
    }
  }, [eventTitle]);

  return (
    <PageContainer title="Compartilhar Times" onBack={handleBack}>
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* WhatsApp text section */}
        <View className="pt-6 mb-6">
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

        {/* Imagem do Evento — visual export for Instagram */}
        <View className="mb-6">
          <Text className="font-headline font-bold text-lg text-on-surface mb-1">
            Imagem do Evento
          </Text>
          <Text className="text-sm text-on-surface-variant mb-4">Visual export</Text>

          <View className="items-center">
            <ViewShot ref={storyCardRef} options={{ format: 'png', quality: 1 }}>
              <EventStoryCard eventTitle={eventTitle} result={result} />
            </ViewShot>
          </View>
        </View>

        {/* Teams visual preview */}
        <View className="mb-6">
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
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center gap-3 px-4 pb-8 pt-4 bg-surface/80 rounded-t-[24px] shadow-sm">
        <Pressable
          onPress={handleShareWhatsApp}
          className="flex-1 flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary active:scale-[0.98]"
        >
          <MessageCircle size={20} color="#fff" />
          <Text className="text-[11px] font-bold text-white">WhatsApp</Text>
        </Pressable>
        <Pressable
          onPress={handleShareInstagram}
          className="flex-1 flex-col items-center justify-center gap-1 py-3 rounded-xl bg-primary active:scale-[0.98]"
        >
          <Camera size={20} color="#fff" />
          <Text className="text-[11px] font-bold text-white">Instagram</Text>
        </Pressable>
      </View>
    </PageContainer>
  );
}
