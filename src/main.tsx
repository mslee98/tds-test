import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

const updateSW = registerSW({
  onNeedRefresh() {
    window.dispatchEvent(new CustomEvent('pwa:need-refresh'));
  },
  onOfflineReady() {
    window.dispatchEvent(new CustomEvent('pwa:offline-ready'));
  },
});

window.updateServiceWorker = updateSW;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
