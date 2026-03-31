import { Users } from 'lucide-react-native';
import { Image, Text, View } from 'react-native';

const ILLUSTRATION_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAI0NM7-tNai8L4atUvf5Q5tTwiwe_HdeSCxoXiVRU4KKNfh_R2ZK8KA8IjzABEK5tieXESbu0lrL8WhlasN83jHt5sT7wvrZZ7AquyXOS-xYJv3b_J0chjh9PUJy0mJ816G9rsYUc6aC97q6eujtJ2GMj2vNFUky1eyuwZmIpXznxMkSQUtJC4cIADK2FIy0ATBV3wwKcoXxaoqekcUE46QizxgrgjdT6uWF9GRYrc8xvOCJy_wxpmxpe2oceAm-xr4yMAQQkbB-kn';

export function OnboardingOrganize() {
  return (
    <View className="flex-1 px-6 pt-4 pb-48">
      {/* Illustration Section */}
      <View className="items-center justify-center mb-12 mt-4">
        <View className="relative w-80 aspect-square max-w-full">
          {/* Background decorative elements */}
          <View className="absolute inset-0 bg-primary-container opacity-20 rounded-[40px] rotate-3 translate-x-2" />
          <View className="absolute inset-0 bg-secondary-fixed opacity-10 rounded-[40px] -rotate-3 -translate-x-2" />
          {/* Main Illustration */}
          <View className="relative w-full h-full bg-surface-container-lowest rounded-xl items-center justify-center overflow-hidden">
            <Image
              source={{ uri: ILLUSTRATION_URL }}
              className="w-full h-full"
              resizeMode="contain"
              accessibilityLabel="Sports Community Illustration"
            />
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View className="gap-6">
        <View className="gap-3">
          <Text className="font-extrabold text-primary text-4xl leading-tight tracking-tight">
            Organize seus rachões
          </Text>
          <Text className="text-on-surface-variant text-lg leading-relaxed max-w-[90%]">
            Crie grupos, gerencie eventos e sorteie times em segundos
          </Text>
        </View>

        {/* Feature Micro-card */}
        <View className="bg-surface-container-low rounded-xl p-4 flex-row items-center gap-4">
          <View className="bg-primary p-3 rounded-full items-center justify-center">
            <Text className="text-secondary-fixed text-2xl">
              <Users size={24} color="#fff" />
            </Text>
          </View>
          <View>
            <Text className="font-bold text-on-surface text-base">
              Gestão de Grupos
            </Text>
            <Text className="text-on-surface-variant text-md">
              Tudo num só lugar
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
