import type { ReactNode } from 'react';
import { DesktopPromoSidebar } from './DesktopPromoSidebar';

type MobileViewportProps = {
  children: ReactNode;
};

/**
 * 강남언니 웹 레이아웃 셸
 * - 모바일: 회색 배경 위 흰 프레임(최대 616px) 전체 너비
 * - 데스크톱(≥1024px): 좌측 프로모 360px + 중앙 프레임(360~616px)
 * - 홈 등 lockScroll 화면: 프레임 높이 = 뷰포트, 스크롤은 프레임 내부 main
 */
export function MobileViewport({ children }: MobileViewportProps) {
  return (
    <div className="mx-auto flex min-h-0 w-full flex-1 flex-row justify-center bg-grey-100">
      <aside className="mr-4 hidden h-full shrink-0 desktop:block desktop:w-[360px] desktop:min-w-[360px]">
        <DesktopPromoSidebar />
      </aside>

      <main
        id="frameMain"
        className="relative flex w-full min-w-0 max-w-[616px] flex-col bg-background shadow-[0px_0px_8px_rgba(0,0,0,0.16)] desktop:min-w-[360px]"
      >
        {children}
      </main>
    </div>
  );
}
