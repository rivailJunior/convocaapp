import { useRouter } from 'expo-router';
import { CheckCircle } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

import { useRecurrentEventForm } from '@sportspay/shared';

import { DateTimeButton } from '../../src/components/event/date-time-button';
import { FormSection } from '../../src/components/event/form-section';
import { InfoCard } from '../../src/components/event/info-card';
import { PageHeader } from '../../src/components/event/page-header';
import { RecurrenceCard } from '../../src/components/event/recurrence-card';
import { TextAreaField } from '../../src/components/event/text-area-field';
import { TextInputField } from '../../src/components/event/text-input-field';
import { TextInputWithIcon } from '../../src/components/event/text-input-with-icon';
import { PageContainer } from '../../src/components/page-container';
import { PrimaryButton } from '../../src/components/primary-button';

export default function CreateRecurrentEventScreen() {
  const router = useRouter();
  const {
    eventName,
    setEventName,
    dateTime,
    location,
    setLocation,
    notes,
    setNotes,
    isRecurring,
    setIsRecurring,
    frequency,
    setFrequency,
    selectedDays,
    toggleDay,
    endDate,
    setEndDate,
  } = useRecurrentEventForm();

  const handleDateTimePress = () => {
    console.log('Open date/time picker');
  };

  const handleEndDatePress = () => {
    console.log('Open end date picker');
  };

  const handleCreateEvent = () => {
    console.log('Create event');
  };

  return (
    <PageContainer title="Novo Evento" onBack={() => router.back()}>
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 120 }}>
          <PageHeader subtitle="Preencha os detalhes para organizar sua partida." />

          <View className="gap-6">
            <FormSection label="Nome do evento">
              <TextInputField
                value={eventName}
                onChangeText={setEventName}
                placeholder="Ex: Futebol 18/01"
              />
            </FormSection>

            <FormSection label="Data e hora">
              <DateTimeButton value={dateTime} onPress={handleDateTimePress} />
            </FormSection>

            <FormSection label="Local" optional>
              <TextInputWithIcon
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Arena Beach Sports"
              />
            </FormSection>

            <FormSection label="Observações" optional>
              <TextAreaField
                value={notes}
                onChangeText={setNotes}
                placeholder="Notas ou instruções para o evento..."
                rows={3}
              />
            </FormSection>

            <RecurrenceCard
              isEnabled={isRecurring}
              onToggle={setIsRecurring}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              selectedDays={selectedDays}
              onToggleDay={toggleDay}
              endDate={endDate}
              onEndDateChange={setEndDate}
              onEndDatePress={handleEndDatePress}
            />

            <InfoCard
              title="Notificações Ativas"
              description="Enviaremos lembretes para os participantes 2 horas antes do início."
            />
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 bg-surface/80">
          <PrimaryButton
            label="Criar Evento"
            onPress={handleCreateEvent}
            icon={<CheckCircle size={20} color="#ffffff" fill="none" style={{ marginLeft: 8 }} />}
          />
        </View>
    </PageContainer>
  );
}
