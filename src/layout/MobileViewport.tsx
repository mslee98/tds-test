import { colors } from '@toss/tds-colors';
import type { ReactNode } from 'react';
import { useRuntime } from '../hooks/useRuntime';

const MOBILE_MAX_WIDTH = 430;

type MobileViewportProps = {
  children: ReactNode;
};

export function MobileViewport({ children }: MobileViewportProps) {
  const { useMobileLayout } = useRuntime();

  if (useMobileLayout) {
    return (
      <div style={{ width: '100%', minHeight: '100dvh' }}>{children}</div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: colors.grey100,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: MOBILE_MAX_WIDTH,
          minHeight: '100dvh',
          backgroundColor: colors.background,
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
