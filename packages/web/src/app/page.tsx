import React from 'react';

export default function HomePage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">SportsPay</h1>
      <p className="mt-4 text-lg text-gray-600">
        Gestão de pagamentos e presença para grupos esportivos
      </p>
    </main>
  );
}
