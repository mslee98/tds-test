import type { ReactNode } from 'react';

type FrameAlignedFooterProps = {
  children: ReactNode;
};

/**
 * #frameMain과 동일한 flex 행(사이드바 + 프레임)으로 하단 탭 위치를 맞춤.
 * viewport 기준 fixed가 아니라 MobileViewport 레이아웃을 그대로 반복한다.
 */
export function FrameAlignedFooter({ children }: FrameAlignedFooterProps) {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[100] flex w-full flex-row justify-center">
      <div
        aria-hidden
        className="mr-4 hidden shrink-0 desktop:block desktop:w-[360px] desktop:min-w-[360px]"
      />
      <div className="pointer-events-auto w-full min-w-0 max-w-[616px] overflow-hidden rounded-t-[20px] bg-background shadow-[0_-2px_12px_rgba(0,0,0,0.06)] desktop:min-w-[360px]">
        {children}
      </div>
    </div>
  );
}
