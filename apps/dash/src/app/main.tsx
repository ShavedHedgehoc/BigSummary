import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { DataProvider } from './providers';
import { App } from '.';

createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <App />
  </DataProvider>,
);
