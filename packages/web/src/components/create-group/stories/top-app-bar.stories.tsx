import { TopAppBar } from '@/components/create-group/top-app-bar';

const meta = {
  title: 'Components/Group/CreateGroup/TopAppBar',
  component: TopAppBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  args: {
    title: 'Novo Grupo',
    onBack: () => {},
  },
};

export const CustomTitle = {
  args: {
    title: 'Editar Grupo',
    onBack: () => {},
  },
};
