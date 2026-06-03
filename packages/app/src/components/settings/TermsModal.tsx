import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function TermsModal({ visible, onClose }: TermsModalProps): React.JSX.Element {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-surface">
        <View className="flex-row items-center justify-between p-4 border-b border-surface-container-highest">
          <Text className="text-xl font-bold text-on-surface font-headline">Termos de Uso</Text>
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
                Termos de Uso do Convoca
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Última atualização: {new Date().toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                1. Aceitação dos Termos
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Ao usar o aplicativo Convoca, você concorda com estes termos de uso. Se você não
                concordar com estes termos, não use o aplicativo.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                2. Descrição do Serviço
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O Convoca é um aplicativo móvel projetado para ajudar na organização de grupos
                desportivos, gerenciamento de eventos, controle de presença e divisão de custos
                entre participantes.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                3. Responsabilidades do Usuário
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Como usuário do Convoca, você se compromete a: • Fornecer informações verdadeiras e
                atualizadas • Respeitar outros participantes do grupo • Usar o aplicativo para fins
                legítimos • Não compartilhar informações falsas ou enganosas • Cumprir com os
                compromissos financeiros assumidos
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">4. Uso de Dados</Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Você é responsável pelas informações que insere no aplicativo. O aplicativo armazena
                dados localmente em seu dispositivo, e você é responsável por fazer backup adequado
                de suas informações importantes.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                5. Pagamentos e Transações Financeiras
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O Convoca facilita o controle de pagamentos entre participantes, mas não processa
                transações financeiras diretamente. As informações de pagamento (como chaves PIX)
                são fornecidas pelos usuários e as transações são realizadas diretamente entre eles.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                6. Propriedade Intelectual
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O aplicativo Convoca e seu conteúdo são protegidos por direitos autorais e outras
                leis de propriedade intelectual. Você não pode copiar, modificar, distribuir ou
                criar trabalhos derivados do aplicativo sem permissão expressa.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                7. Limitação de Responsabilidade
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O Convoca é fornecido "como está" sem garantias de qualquer tipo. Não somos
                responsáveis por perdas diretas ou indiretas resultantes do uso do aplicativo,
                incluindo perda de dados, lucros cessantes ou danos emergentes.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                8. Disponibilidade do Serviço
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                O aplicativo funciona offline e não depende de servidores externos para sua operação
                básica. No entanto, podemos atualizar o aplicativo periodicamente para melhorar a
                funcionalidade e corrigir problemas.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                9. Suspensão e Término
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Reservamo-nos o direito de suspender ou terminar o acesso ao aplicativo em caso de
                violação destes termos de uso. Você pode parar de usar o aplicativo a qualquer
                momento e desinstalá-lo de seu dispositivo.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">
                10. Alterações nos Termos
              </Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Podemos atualizar estes termos de uso periodicamente. Quaisquer alterações entrarão
                em vigor quando publicadas no aplicativo. O uso continuado do aplicativo após
                alterações constitui aceitação dos novos termos.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">11. Lei Aplicável</Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Estes termos de uso são regidos pelas leis do Brasil. Quaisquer disputas serão
                resolvidas de acordo com a legislação brasileira.
              </Text>
            </View>

            <View>
              <Text className="text-base font-bold text-on-surface mb-2">12. Contato</Text>
              <Text className="text-sm text-on-surface-variant leading-relaxed">
                Se você tiver dúvidas sobre estes termos de uso, entre em contato conosco para
                esclarecimentos.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
