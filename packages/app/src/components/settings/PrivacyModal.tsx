import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

interface PrivacyModalProps {
  visible: boolean;
  onClose: () => void;
}

export function PrivacyModal({ visible, onClose }: PrivacyModalProps): React.JSX.Element {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-surface">
        <View className="flex-row items-center justify-between p-4 border-b border-surface-container-highest">
          <Text className="text-xl font-bold text-on-surface font-headline">
            Política de Privacidade
          </Text>
          <Pressable
            onPress={onClose}
            className="px-4 py-2 bg-surface-container-high rounded-full active:opacity-70"
          >
            <Text className="text-on-surface font-medium">Fechar</Text>
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-4 py-4">
          <View className="space-y-4">
            <View>
              <Text className="text-lg font-bold text-on-surface mb-2">
                Política de Privacidade do Convoca
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                1. Informações Coletadas
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O Convoca coleta apenas as informações que você fornece diretamente no aplicativo,
                incluindo nomes de participantes, informações de grupos e eventos. Não coletamos
                informações pessoais identificáveis além do necessário para o funcionamento do
                aplicativo.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                2. Uso das Informações
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                As informações coletadas são usadas exclusivamente para: • Organizar e gerenciar
                grupos desportivos • Controlar presença em eventos • Gerenciar pagamentos e divisões
                de custos • Facilitar a comunicação entre participantes
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                3. Armazenamento de Dados
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Todos os dados são armazenados localmente em seu dispositivo. Não realizamos backup
                automático em servidores externos nem enviamos seus dados para terceiros. Você pode
                exportar seus dados a qualquer momento através das configurações do aplicativo.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                4. Compartilhamento de Dados
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Não compartilhamos, vendemos ou transferimos suas informações para terceiros, exceto
                quando exigido por lei ou com seu consentimento explícito.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">5. Segurança</Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Implementamos medidas de segurança razoáveis para proteger suas informações contra
                acesso não autorizado, alteração ou destruição. No entanto, nenhum sistema é 100%
                seguro, então recomendamos fazer backup regular de seus dados.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                6. Direitos do Usuário
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Você tem o direito de: • Acessar seus dados a qualquer momento • Exportar todos seus
                dados • Excluir o aplicativo e todos os dados associados • Solicitar correção de
                informações incorretas
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">7. Contato</Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Se você tiver dúvidas sobre esta política de privacidade ou preocupações sobre como
                seus dados são tratados, entre em contato conosco.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                8. Alterações nesta Política
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Podemos atualizar esta política de privacidade periodicamente. Quaisquer alterações
                serão publicadas nesta página com a data da última atualização.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
