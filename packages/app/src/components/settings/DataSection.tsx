import { Download, Upload } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface DataSectionProps {
  onExportPress: () => void;
  onImportPress: () => void;
}

export function DataSection({
  onExportPress,
  onImportPress,
}: DataSectionProps): React.JSX.Element {
  return (
    <View>
      <Text className="text-on-surface-variant font-headline font-bold text-xs mb-3 ml-1 uppercase tracking-widest">
        Dados
      </Text>
      <View className="bg-surface-container-lowest rounded-xl overflow-hidden">
        <Pressable
          onPress={onExportPress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <View className="flex-row items-center gap-3">
            <Download size={20} color="#185c1e" />
            <Text className="font-medium text-on-surface">
              Exportar grupos e eventos
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={onImportPress}
          className="flex-row items-center justify-between p-4 active:opacity-70"
        >
          <View className="flex-row items-center gap-3">
            <Upload size={20} color="#185c1e" />
            <Text className="font-medium text-on-surface">Importar dados</Text>
          </View>
        </Pressable>
      </View>
      <Text className="mt-2 ml-4 text-xs text-on-surface-variant font-medium">
        Faça backup dos seus dados localmente
      </Text>
    </View>
  );
}
