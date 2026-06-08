import { colors } from '@toss/tds-colors';
import { ActiveTradeCard } from '../components/home/ActiveTradeCard';
import { BalanceCard } from '../components/home/BalanceCard';
import { HomeBottomNav } from '../components/home/HomeBottomNav';
import { HomeHeader } from '../components/home/HomeHeader';
import { PartnerCard } from '../components/home/PartnerCard';
import { RecentHistoryCard } from '../components/home/RecentHistoryCard';

export function HomePage() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: colors.grey100,
        display: 'flex',
        flexDirection: 'column',
        color: colors.grey900,
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px 120px',
        }}
      >
        <HomeHeader />

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <BalanceCard />
          <ActiveTradeCard />
          <PartnerCard />
          <RecentHistoryCard />
        </div>
      </div>

      <HomeBottomNav />
    </div>
  );
}
