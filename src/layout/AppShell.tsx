import type { ReactNode } from 'react';
import { useRuntime } from '../hooks/useRuntime';
import { useSafeAreaInsets } from '../hooks/useSafeAreaInsets';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { isInApp, useMobileLayout } = useRuntime();
  const insets = useSafeAreaInsets();

  return (
    <div
      className="flex min-h-dvh w-full flex-1 flex-col"
      style={{
        paddingTop: isInApp
          ? insets.top
          : 'env(safe-area-inset-top, 0px)',
        // 하단 safe area는 HomeBottomNav가 처리 — 이중 패딩 방지
        paddingBottom: isInApp ? insets.bottom : undefined,
        // 모바일 프레임은 가로 풀폭 — 좌우 패딩으로 프레임·탭 위치 어긋남 방지
        paddingLeft: isInApp
          ? insets.left
          : useMobileLayout
            ? undefined
            : 'env(safe-area-inset-left, 0px)',
        paddingRight: isInApp
          ? insets.right
          : useMobileLayout
            ? undefined
            : 'env(safe-area-inset-right, 0px)',
      }}
    >
      {children}
    </div>
  );
}
