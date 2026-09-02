import { createContext, useContext } from 'react';

export const HealthContext = createContext<{
  isApiAlive: boolean;
  setApiAlive: (status: boolean) => void;
} | null>(null);

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) throw new Error('useHealth must be used within a HealthProvider');
  return context;
};
