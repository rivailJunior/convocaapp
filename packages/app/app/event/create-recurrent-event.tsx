import { ScrollView,  TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useRecurrentEventForm } from '@sportspay/shared';
import { PageHeader } from '../../src/components/event/page-header';
import { FormSection } from '../../src/components/event/form-section';
import { TextInputField } from '../../src/components/event/text-input-field';
import { DateTimeButton } from '../../src/components/event/date-time-button';
import { TextInputWithIcon } from '../../src/components/event/text-input-with-icon';
import { TextAreaField } from '../../src/components/event/text-area-field';
import { RecurrenceCard } from '../../src/components/event/recurrence-card';
import { InfoCard } from '../../src/components/event/info-card';
import { PrimaryButton } from '../../src/components/primary-button';
import { CheckCircle } from 'lucide-react-native';

export default function CreateRecurrentEventScreen() {
  const router = useRouter();
  const {
    eventName,
    setEventName,
    dateTime,
    setDateTime,
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
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Novo Evento',
          headerTitleStyle: {
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#266829',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className='items-center justify-center w-10 h-10'>
              <ArrowLeft size={24} color="#266829" />
            </TouchableOpacity>
          ),
          
          headerStyle: {
            backgroundColor: '#eff1f2',
          },
        }}
      />

      <View className="flex-1 bg-surface">
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
          <PrimaryButton label="Criar Evento" onPress={handleCreateEvent} icon={
            <CheckCircle
          size={20}
          color="#ffffff"
          fill="none"
          style={{ marginLeft: 8 }}
        />} />
        </View>
      </View>
    </>
  );
}
