import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold">SportsPay</Text>
      <Text className="mt-4 text-lg text-gray-600">
        Gestão de pagamentos e presença para grupos esportivos
      </Text>
    </View>
  );
}
