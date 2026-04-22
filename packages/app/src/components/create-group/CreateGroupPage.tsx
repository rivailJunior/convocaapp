import { router } from 'expo-router';
import { Info, CreditCard } from 'lucide-react-native';
import { useCallback } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { useCreateGroup } from '@sportspay/shared';

import { PageContainer } from '../page-container';

import { BottomActionBar } from './components/BottomActionBar';
import { CreateEventBanner } from './components/CreateEventBanner';
import { ParticipantList } from './components/ParticipantList';
import { SportSelectionGrid } from './components/SportSelectionGrid';

export function CreateGroupPage(): React.JSX.Element {
  const {
    formState,
    setGroupName,
    setSport,
    setPixKey,
    addParticipant,
    removeParticipant,
    changeParticipantName,
  } = useCreateGroup();

  const handleBack = useCallback(() => router.back(), []);

  return (
    <PageContainer title="Novo Grupo" onBack={handleBack}>
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-8 pt-8">
          <Text className="font-bold text-lg text-on-surface mb-4">Informações Básicas</Text>
          <View className="gap-6">
            <View className="gap-2">
              <Text className="font-semibold text-sm text-on-surface-variant">Nome do grupo</Text>
              <TextInput
                className="w-full bg-surface-container-high rounded-xl px-4 py-4 text-on-surface text-base"
                placeholder="Ex: Fute de quinta"
                placeholderTextColor="#757778"
                value={formState.groupName}
                onChangeText={setGroupName}
              />
            </View>
          </View>
        </View>

        <SportSelectionGrid selected={formState.sport} onSelect={setSport} />

        <View className="mb-8">
          <View className="flex-row items-center gap-1 mb-4">
            <Text className="font-bold text-lg text-on-surface">Chave Pix do caixa</Text>
            <Info size={18} color="#757778" />
          </View>
          <View className="gap-2">
            <View className="flex-row items-center bg-surface-container-high rounded-xl px-4">
              <CreditCard size={20} color="#595c5d" />
              <TextInput
                className="flex-1 bg-transparent py-4 ml-3 text-on-surface text-base"
                placeholder="Ex: joao@email.com"
                placeholderTextColor="#757778"
                value={formState.pixKey}
                onChangeText={setPixKey}
              />
            </View>
            <Text className="text-[10px] font-medium text-on-surface-variant pl-1">
              Será usada para compartilhar cobrança nos eventos
            </Text>
          </View>
        </View>

        <ParticipantList
          participants={formState.participants}
          onChangeName={changeParticipantName}
          onRemove={removeParticipant}
          onAdd={addParticipant}
        />

        <CreateEventBanner />
      </ScrollView>

      <BottomActionBar />
    </PageContainer>
  );
}
