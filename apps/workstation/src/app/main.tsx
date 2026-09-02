import { createRoot } from 'react-dom/client';
import { App } from '.';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';
import { DataProvider } from './providers';
import './styles/reset.css';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
  <CssVarsProvider>
    <CssBaseline />
    <DataProvider>
      <App />
    </DataProvider>
  </CssVarsProvider>,
);
