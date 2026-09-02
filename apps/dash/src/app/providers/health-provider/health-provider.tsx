import { useState, ReactNode, useEffect, useRef } from 'react';
import { ApiFalldownScreen } from '@/shared/ui';
import { HealthContext } from './model';

export function HealthProvider({ children }: { children: ReactNode }) {
  const [isApiAlive, setApiAlive] = useState(true);
  const pingIntervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isApiAlive) {
      pingIntervalRef.current = window.setInterval(async () => {
        try {
          const response = await fetch('/trpc_api/health.check');
          if (response.status === 200 || response.status === 204) {
            setApiAlive(true);
          }
        } catch {
          console.log('⏳ Сервер всё ещё недоступен...');
        }
      }, 3000);
    }

    return () => {
      if (pingIntervalRef.current) window.clearInterval(pingIntervalRef.current);
    };
  }, [isApiAlive]);

  if (!isApiAlive) {
    return <ApiFalldownScreen />;
  }

  return (
    <HealthContext.Provider value={{ isApiAlive, setApiAlive }}>{children}</HealthContext.Provider>
  );
}
