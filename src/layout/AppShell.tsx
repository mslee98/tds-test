import type { ReactNode } from 'react';
import { useRuntime } from '../hooks/useRuntime';
import { useSafeAreaInsets } from '../hooks/useSafeAreaInsets';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { isInApp } = useRuntime();
  const insets = useSafeAreaInsets();

  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: isInApp ? insets.top : 'env(safe-area-inset-top, 0px)',
        paddingBottom: isInApp
          ? insets.bottom
          : 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: isInApp ? insets.left : 'env(safe-area-inset-left, 0px)',
        paddingRight: isInApp
          ? insets.right
          : 'env(safe-area-inset-right, 0px)',
      }}
    >
      {children}
    </div>
  );
}
