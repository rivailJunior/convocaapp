import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckCircle } from 'lucide-react-native';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';

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
import { createRecurrentEvent } from '../../src/services/database/entities/event/event';

import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export default function CreateRecurrentEventScreen() {
  const router = useRouter();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
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
    arenaValue,
    setArenaValue,
    participantValue,
    setParticipantValue,
  } = useRecurrentEventForm();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const scrollViewRef = useRef<ScrollView>(null);

  const [endDateSelected, setEndDateSelected] = useState(new Date());
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const formatCurrencyBRL = (raw: string): string => {
    const digits = raw.replace(/\D/g, '');
    const cents = parseInt(digits || '0', 10);
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleArenaValueChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    setArenaValue(digits ? formatCurrencyBRL(digits) : '');
  };

  const handleParticipantValueChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    setParticipantValue(digits ? formatCurrencyBRL(digits) : '');
  };

  const formatDateTimeForStorage = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const formatDateTimeForDisplay = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleDateTimePress = () => {
    setPickerMode('date');
    setShowPicker(true);
  };

  const handlePickerChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (_event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    const chosen = date ?? selectedDate;
    setSelectedDate(chosen);

    if (Platform.OS === 'android') {
      if (pickerMode === 'date') {
        setShowPicker(false);
        setPickerMode('time');
        setTimeout(() => setShowPicker(true), 100);
      } else {
        setShowPicker(false);
        setPickerMode('date');
        setDateTime(formatDateTimeForDisplay(chosen));
      }
    } else {
      setDateTime(formatDateTimeForDisplay(chosen));
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const handleEndDatePress = () => {
    setShowEndDatePicker(true);
  };

  const handleEndDatePickerChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (_event.type === 'dismissed') {
      setShowEndDatePicker(false);
      return;
    }

    const chosen = date ?? endDateSelected;
    setEndDateSelected(chosen);
    setEndDate(formatDate(chosen));

    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const eventDateTime = dateTime || formatDateTimeForStorage(selectedDate);

      await createRecurrentEvent({
        groupId: groupId ? Number(groupId) : 0,
        name: eventName,
        dateTime: eventDateTime,
        location,
        notes,
        isRecurring,
        frequency,
        selectedDays,
        endDate: endDate || formatDate(endDateSelected),
        arenaValue: arenaValue
          ? parseFloat(arenaValue.replace(/[^\d,]/g, '').replace(',', '.'))
          : undefined,
        participantValue: participantValue
          ? parseFloat(participantValue.replace(/[^\d,]/g, '').replace(',', '.'))
          : undefined,
      });

      Alert.alert('Novo Evento Criado');
      router.back();
    } catch (error) {
      console.error('[CreateEvent] Failed to create event:', error);
    }
  };

  return (
    <PageContainer title="Novo Evento" onBack={() => router.back()}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <PageHeader subtitle="Preencha os detalhes para organizar sua partida." />

          <View className="gap-6">
            <FormSection label="Nome do evento">
              <TextInputField
                value={eventName}
                onChangeText={setEventName}
                placeholder="Ex: Futebol 18/01"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 100, animated: true });
                  }, 100);
                }}
              />
            </FormSection>

            <FormSection label="Data e hora">
              <DateTimeButton
                value={dateTime || formatDateTimeForDisplay(selectedDate)}
                onPress={handleDateTimePress}
              />
              {showPicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode={Platform.OS === 'ios' ? 'datetime' : pickerMode}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handlePickerChange}
                  locale="pt-BR"
                />
              )}
            </FormSection>

            <FormSection label="Local" optional>
              <TextInputWithIcon
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Arena Beach Sports"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 200, animated: true });
                  }, 100);
                }}
              />
            </FormSection>

            <FormSection label="Valor da Arena" optional>
              <TextInputField
                value={arenaValue}
                onChangeText={handleArenaValueChange}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 250, animated: true });
                  }, 100);
                }}
              />
            </FormSection>

            <FormSection label="Valor por Participante" optional>
              <TextInputField
                value={participantValue}
                onChangeText={handleParticipantValueChange}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 300, animated: true });
                  }, 100);
                }}
              />
            </FormSection>

            <FormSection label="Observações" optional>
              <TextAreaField
                value={notes}
                onChangeText={setNotes}
                placeholder="Notas ou instruções para o evento..."
                rows={3}
                onFocus={() => {
                  setTimeout(() => {
                    scrollViewRef.current?.scrollTo({ y: 350, animated: true });
                  }, 100);
                }}
              />
            </FormSection>

            <RecurrenceCard
              isEnabled={isRecurring}
              onToggle={setIsRecurring}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              selectedDays={selectedDays}
              onToggleDay={toggleDay}
              endDate={endDate || formatDate(endDateSelected)}
              onEndDatePress={handleEndDatePress}
              showEndDatePicker={showEndDatePicker}
              endDatePickerValue={endDateSelected}
              onEndDatePickerChange={handleEndDatePickerChange}
            />

            <InfoCard
              title="Notificações Ativas"
              description="Enviaremos lembretes para os participantes 2 horas antes do início."
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
