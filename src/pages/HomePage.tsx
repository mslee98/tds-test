import { useToast } from '@toss/tds-mobile';
import { useCallback, useState } from 'react';
import {
  ActiveTradeCard,
  AuthEntrySection,
  BalanceCard,
  HomeBottomNav,
  HomeHeader,
  PartnerCard,
  RecentHistoryCard,
} from '../components/home';
import { useRuntime } from '../hooks/useRuntime';
import { FRAME_CONTENT_GUTTER_CLASS } from '../layout/frame';
import { ScreenLayout } from '../layout/ScreenLayout';

const REFRESH_DELAY_MS = 800;

export function HomePage() {
  const { useMobileLayout } = useRuntime();
  const { openToast } = useToast();
  const [balanceRefreshTrigger, setBalanceRefreshTrigger] = useState(0);

  const handleRefresh = useCallback(async () => {
    // TODO: API 연동 시 queryClient.invalidateQueries 등으로 교체
    await new Promise((resolve) => setTimeout(resolve, REFRESH_DELAY_MS));
    setBalanceRefreshTrigger((prev) => prev + 1);
    openToast('새로고침했어요', { icon: 'icn-success-color' });
  }, [openToast]);

  return (
    <ScreenLayout
      header={<HomeHeader />}
      footer={<HomeBottomNav />}
      lockScroll
      onRefresh={useMobileLayout ? handleRefresh : undefined}
      contentClassName={`${FRAME_CONTENT_GUTTER_CLASS} pt-2`}
    >
      <div className="flex flex-col gap-3">
        <BalanceCard balanceRefreshTrigger={balanceRefreshTrigger} />
        <ActiveTradeCard />
        <PartnerCard />
        <RecentHistoryCard />
        <AuthEntrySection />
      </div>
    </ScreenLayout>
  );
}
