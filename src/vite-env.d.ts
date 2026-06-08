/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare global {
  interface Window {
    updateServiceWorker?: (reloadPage?: boolean) => Promise<void>;
  }
}

export {};
