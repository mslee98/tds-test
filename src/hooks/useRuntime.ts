import { useEffect, useState } from 'react';
import { useStandalone } from '../pwa/useStandalone';

export type RuntimeMode = 'in-app' | 'pwa' | 'mobile-web' | 'desktop-web';

function detectInApp(): boolean {
  const map = (
    window as Window & { __CONSTANT_HANDLER_MAP?: Record<string, unknown> }
  ).__CONSTANT_HANDLER_MAP;

  return map != null && 'getOperationalEnvironment' in map;
}

export function useRuntime() {
  const isStandalone = useStandalone();
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => window.matchMedia('(max-width: 1023px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (event: MediaQueryListEvent) =>
      setIsMobileViewport(event.matches);

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isInApp = detectInApp();

  const mode: RuntimeMode = isInApp
    ? 'in-app'
    : isStandalone
      ? 'pwa'
      : isMobileViewport
        ? 'mobile-web'
        : 'desktop-web';

  const useMobileLayout = mode !== 'desktop-web';

  return { mode, useMobileLayout, isInApp, isStandalone };
}

export const RUNTIME_MODE_LABEL: Record<RuntimeMode, string> = {
  'in-app': '인앱',
  pwa: 'PWA standalone',
  'mobile-web': '모바일 브라우저',
  'desktop-web': '데스크톱 브라우저',
};
