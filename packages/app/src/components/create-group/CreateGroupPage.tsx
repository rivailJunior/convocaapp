import { CreditCard, Info } from 'lucide-react-native';
import { Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

import { useCreateGroup } from '@sportspay/shared';

import { createGroup } from '../../services/database/entities/group/group';
import { PageContainer } from '../page-container';
import { BottomActionBar } from './components/BottomActionBar';
import { ParticipantList } from './components/ParticipantList';
import { SportSelectionGrid } from './components/SportSelectionGrid';

export function CreateGroupPage(): React.JSX.Element {
  const {
    formState,
    canSubmit,
    setGroupName,
    setSport,
    setPixKey,
    addParticipant,
    importParticipants,
    removeParticipant,
    changeParticipantName,
    resetForm,
  } = useCreateGroup();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = useCallback(() => router.back(), []);

  const handleCancel = useCallback(() => {
    resetForm();
    router.back();
  }, [resetForm]);

  const handleSave = useCallback(async () => {
    if (!formState.sport) return;

    setIsSubmitting(true);
    try {
      await createGroup({
        name: formState.groupName.trim(),
        sport: formState.sport,
        pixKey: formState.pixKey.trim(),
        participants: formState.participants
          .filter((p) => p.name.trim().length > 0)
          .map((p) => ({ name: p.name.trim() })),
      });
      resetForm();
      router.back();
    } catch (error) {
      console.error('[CreateGroupPage] Failed to save group:', error);
      Alert.alert('Erro', 'Não foi possível criar o grupo. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formState, resetForm]);

  return (
    <PageContainer title="Novo Grupo" onBack={handleBack}>
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mb-8 pt-8">
          <Text className="font-bold text-lg text-on-surface mb-4">Informações Básicas</Text>
          <View className="gap-6">
            <View className="gap-2">
              <Text className="font-semibold text-sm text-on-surface-variant">Nome do grupo</Text>
              <View>
                <TextInput
                  className="w-full bg-surface-container-high rounded-xl p-4 text-on-surface"
                  placeholder="Ex: Fute de quinta"
                  placeholderTextColor="#757778"
                  value={formState.groupName}
                  onChangeText={setGroupName}
                />
              </View>
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
                className="flex-1 bg-transparent py-4 ml-3 text-on-surface "
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
          onImport={importParticipants}
        />

        {/* <CreateEventBanner /> */}
      </ScrollView>

      <BottomActionBar
        onCancel={handleCancel}
        onSave={handleSave}
        canSave={canSubmit}
        isSubmitting={isSubmitting}
      />
    </PageContainer>
  );
}
