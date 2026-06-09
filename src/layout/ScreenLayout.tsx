import { FixedBottomCTA } from '@toss/tds-mobile';
import { useEffect, type ReactNode } from 'react';
import { PullToRefreshContainer } from '../components/PullToRefreshContainer';
import { useRuntime } from '../hooks/useRuntime';
import { FrameAlignedFooter } from './FrameAlignedFooter';
import { BOTTOM_NAV_HEIGHT } from './frame';

type ScreenLayoutProps = {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  hideCta?: boolean;
  /**
   * 프레임 내부 스크롤 모드 — html/body 잠금, main에서 스크롤.
   * 모바일·데스크톱 공통.
   */
  lockScroll?: boolean;
  /** 모바일에서 당겨서 새로고침 */
  onRefresh?: () => Promise<void>;
};

const CTA_RESERVED_HEIGHT = 80;
const SCROLL_LOCK_CLASS = 'home-mobile-no-scroll';

/**
 * 토스 앱 스타일 화면 골격 (프레임 내부)
 * - lockScroll: 프레임 내부 스크롤 (문서 스크롤 대신 main overflow)
 * - onRefresh: 모바일/PWA/인앱에서 pull-to-refresh
 */
export function ScreenLayout({
  children,
  header,
  footer,
  contentClassName = '',
  ctaLabel,
  onCtaClick,
  hideCta = false,
  lockScroll = false,
  onRefresh,
}: ScreenLayoutProps) {
  const { useMobileLayout } = useRuntime();
  const showPullToRefresh = onRefresh != null && useMobileLayout;
  const showCta = !hideCta && ctaLabel != null;

  useEffect(() => {
    const frame = document.getElementById('frameMain');
    const root = document.documentElement;

    if (lockScroll) {
      root.classList.add(SCROLL_LOCK_CLASS);
      document.body.classList.add(SCROLL_LOCK_CLASS);
      frame?.classList.add('frame-lock-scroll');
    } else {
      root.classList.remove(SCROLL_LOCK_CLASS);
      document.body.classList.remove(SCROLL_LOCK_CLASS);
      frame?.classList.remove('frame-lock-scroll');
    }

    return () => {
      root.classList.remove(SCROLL_LOCK_CLASS);
      document.body.classList.remove(SCROLL_LOCK_CLASS);
      frame?.classList.remove('frame-lock-scroll');
    };
  }, [lockScroll]);

  const bottomPadding = footer
    ? BOTTOM_NAV_HEIGHT
    : showCta
      ? CTA_RESERVED_HEIGHT
      : undefined;

  const mainClassName = [
    'flex-1',
    lockScroll ? 'scrollbar-hidden min-h-0 overflow-y-auto' : '',
    contentClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const mainStyle = {
    minHeight: lockScroll ? undefined : '100dvh',
    paddingBottom: bottomPadding,
  };

  const mainContent = (
    <main className={mainClassName} style={mainStyle}>
      {header ? <div className="shrink-0 bg-grey-100">{header}</div> : null}
      {children}
    </main>
  );

  return (
    <>
      <div
        className={`flex w-full flex-col bg-grey-100 ${
          lockScroll ? 'min-h-0 flex-1 overflow-hidden' : 'min-h-dvh'
        }`}
      >
        {showPullToRefresh ? (
          <PullToRefreshContainer
            onRefresh={onRefresh}
            className="pull-to-refresh-root scrollbar-hidden"
          >
            {mainContent}
          </PullToRefreshContainer>
        ) : (
          mainContent
        )}
      </div>

      {footer ? <FrameAlignedFooter>{footer}</FrameAlignedFooter> : null}

      {showCta && (
        <FixedBottomCTA onClick={onCtaClick}>{ctaLabel}</FixedBottomCTA>
      )}
    </>
  );
}
