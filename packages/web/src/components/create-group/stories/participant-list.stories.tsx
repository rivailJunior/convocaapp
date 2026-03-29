import React, { useState } from 'react';

import type { Participant } from '@/components/create-group/participant-list';
import { ParticipantList } from '@/components/create-group/participant-list';

const meta = {
  title: 'Components/Group/CreateGroup/ParticipantList',
  component: ParticipantList,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const mockParticipants: Participant[] = [
  { id: '1', name: 'João Silva' },
  { id: '2', name: 'Maria Oliveira' },
  { id: '3', name: 'Ricardo Santos' },
];

export const WithParticipants = {
  render: () => (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <ParticipantList
        participants={mockParticipants}
        onChangeName={() => {}}
        onRemove={() => {}}
        onAdd={() => {}}
        onImport={() => {}}
      />
    </div>
  ),
};

export const Empty = {
  render: () => (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <ParticipantList
        participants={[]}
        onChangeName={() => {}}
        onRemove={() => {}}
        onAdd={() => {}}
        onImport={() => {}}
      />
    </div>
  ),
};

let nextId = 4;

function InteractiveTemplate() {
  const [participants, setParticipants] = useState<Participant[]>([...mockParticipants]);

  return (
    <div className="w-[380px] p-4 bg-[#f5f6f7]">
      <ParticipantList
        participants={participants}
        onChangeName={(id, name) =>
          setParticipants((prev) =>
            prev.map((p) => (p.id === id ? { ...p, name } : p)),
          )
        }
        onRemove={(id) =>
          setParticipants((prev) => prev.filter((p) => p.id !== id))
        }
        onAdd={() => {
          const id = String(nextId++);
          setParticipants((prev) => [...prev, { id, name: '' }]);
        }}
        onImport={() => {}}
      />
    </div>
  );
}

export const Interactive = {
  render: () => <InteractiveTemplate />,
};
