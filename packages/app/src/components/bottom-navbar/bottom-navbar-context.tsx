import { createContext, useCallback, useContext, useState } from 'react';

import type { ReactNode } from 'react';

interface BottomNavbarAction {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'destructive';
  disabled?: boolean;
}

interface BottomNavbarContextValue {
  actions: BottomNavbarAction[] | null;
  setActions: (actions: BottomNavbarAction[] | null) => void;
  clearActions: () => void;
}

const BottomNavbarContext = createContext<BottomNavbarContextValue | undefined>(undefined);

interface BottomNavbarProviderProps {
  children: ReactNode;
}

const BottomNavbarProvider = ({ children }: BottomNavbarProviderProps) => {
  const [actions, setActions] = useState<BottomNavbarAction[] | null>(null);

  const clearActions = useCallback(() => {
    setActions(null);
  }, []);

  return (
    <BottomNavbarContext.Provider value={{ actions, setActions, clearActions }}>
      {children}
    </BottomNavbarContext.Provider>
  );
};

const useBottomNavbar = (): BottomNavbarContextValue => {
  const context = useContext(BottomNavbarContext);
  if (!context) {
    throw new Error('useBottomNavbar must be used within a BottomNavbarProvider');
  }
  return context;
};

export { BottomNavbarProvider, useBottomNavbar };
export type { BottomNavbarAction };
