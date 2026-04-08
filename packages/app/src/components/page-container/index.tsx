import { Stack } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

const PageContainer = ({
    title,
    onBack,
    children,
}: {
    title: string;
    onBack: () => void;
    children?: React.ReactNode;
}) => {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: title,
                    headerTitleStyle: {
                        fontFamily: 'Plus Jakarta Sans',
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#266829',
                    },
                    headerLeft: () => (
                        <TouchableOpacity onPress={onBack} className="items-center justify-center w-10 h-10">
                            <ArrowLeft size={24} color="#266829" />
                        </TouchableOpacity>
                    ),

                    headerStyle: {
                        backgroundColor: '#eff1f2',
                    },
                }}
            />
            <View className="flex-1 bg-surface">{children}</View>
        </>
    );
};

export { PageContainer };
