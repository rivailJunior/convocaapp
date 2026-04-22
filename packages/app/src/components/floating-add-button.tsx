import { router, type Href } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';

export function FloatingAddButton({ page }: { page: Href }) {
  const handleCreateEvent = () => {
    router.push(page);
  };
  return (
    <Pressable
      className="absolute bottom-28 right-6 w-16 h-16 rounded-2xl bg-primary items-center justify-center"
      accessibilityLabel="Criar evento"
      onPress={handleCreateEvent}
    >
      <Plus size={28} color="#fff" />
    </Pressable>
  );
}
