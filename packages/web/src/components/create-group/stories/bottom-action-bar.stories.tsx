import React from 'react';

import { BottomActionBar } from '@/components/create-group/bottom-action-bar';

const meta = {
  title: 'Components/Group/CreateGroup/BottomActionBar',
  component: BottomActionBar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default = {
  render: () => (
    <div className="relative h-[200px] bg-[#f5f6f7]">
      <BottomActionBar
        onCancel={() => console.log('cancel')}
        onSubmit={() => console.log('submit')}
        submitLabel="Criar Grupo"
      />
    </div>
  ),
};

export const Submitting = {
  render: () => (
    <div className="relative h-[200px] bg-[#f5f6f7]">
      <BottomActionBar
        onCancel={() => {}}
        onSubmit={() => {}}
        submitLabel="Criar Grupo"
        isSubmitting
      />
    </div>
  ),
};

export const CustomLabel = {
  render: () => (
    <div className="relative h-[200px] bg-[#f5f6f7]">
      <BottomActionBar
        onCancel={() => {}}
        onSubmit={() => {}}
        submitLabel="Salvar Alterações"
      />
    </div>
  ),
};
