import * as React from 'react';
import { useColorScheme } from '@mui/joy';
import { MainPage } from '@/pages';

export function App() {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode('dark');
  }, [setMode]);
  return <MainPage />;
}
