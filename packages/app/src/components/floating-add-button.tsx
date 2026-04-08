import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { router } from 'expo-router';



export function FloatingAddButton({ page }: { page: string }) {
    const handleCreateEvent = () => {
        router.push(page as any);
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