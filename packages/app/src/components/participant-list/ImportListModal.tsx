import { ClipboardPaste, X } from 'lucide-react-native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useCallback, useRef, useState } from 'react';

import { parseWhatsappList } from '@sportspay/shared';

interface ImportListModalProps {
  visible: boolean;
  onClose: () => void;
  onImport: (names: string[]) => void;
}

export function ImportListModal({
  visible,
  onClose,
  onImport,
}: ImportListModalProps): React.JSX.Element {
  const [text, setText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePaste = useCallback(async () => {
    const clipboardContent = await Clipboard.getStringAsync();
    if (clipboardContent) {
      setText(clipboardContent);
    }
  }, []);

  const handleImport = useCallback(() => {
    const names = parseWhatsappList(text);
    if (names.length === 0) {
      Alert.alert(
        'Nenhum participante encontrado',
        'Cole uma lista numerada (ex: 1 - João, 2 - Maria...)',
      );
      return;
    }

    onImport(names);
    setText('');
    onClose();
  }, [text, onImport, onClose]);

  const handleClose = useCallback(() => {
    setText('');
    onClose();
  }, [onClose]);

  const previewNames = text ? parseWhatsappList(text) : [];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={() => {
          Keyboard.dismiss();
          handleClose();
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <Pressable className="bg-surface rounded-t-3xl p-6 " onPress={Keyboard.dismiss}>
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-bold text-lg text-on-surface">Importar lista</Text>
                <Pressable
                  className="p-2 rounded-full active:bg-surface-container-high"
                  onPress={handleClose}
                >
                  <X size={20} color="#2c2f30" />
                </Pressable>
              </View>

              <Text className="text-sm text-on-surface-variant mb-3">
                Cole a lista copiada do WhatsApp abaixo:
              </Text>

              <View className="bg-surface-container-high rounded-xl p-3 mb-3 min-h-[100px] max-h-[200px]">
                <TextInput
                  className="flex-1 text-on-surface"
                  multiline
                  textAlignVertical="top"
                  placeholder={'Ex:\n1 - João ✅\n2 - Maria ✅\n3 - Pedro'}
                  placeholderTextColor="#757778"
                  value={text}
                  onChangeText={setText}
                  onFocus={() => {
                    setTimeout(() => {
                      scrollViewRef.current?.scrollTo({ y: 100, animated: true });
                    }, 100);
                  }}
                />
              </View>

              <Pressable
                className="flex-row items-center justify-center gap-2 mb-4 active:scale-[0.98] bg-blue-400 rounded-lg py-4"
                onPress={handlePaste}
              >
                <ClipboardPaste size={16} color="white" />
                <Text className="text-white font-bold text-sm">Colar da área de transferência</Text>
              </Pressable>

              {previewNames.length > 0 && (
                <View className="mb-4">
                  <Text className="text-xs font-semibold text-on-surface-variant mb-2">
                    {previewNames.length} participante(s) encontrado(s):
                  </Text>
                  <Text className="text-xs text-on-surface-variant" numberOfLines={4}>
                    {previewNames.join(', ')}
                  </Text>
                </View>
              )}

              <Pressable
                className="bg-primary py-4 rounded-xl items-center active:scale-[0.98] mb-4"
                onPress={handleImport}
                disabled={!text.trim()}
                style={!text.trim() ? { opacity: 0.5 } : undefined}
              >
                <Text className="text-on-primary font-bold text-base">
                  Importar {previewNames.length > 0 ? `(${previewNames.length})` : ''}
                </Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
