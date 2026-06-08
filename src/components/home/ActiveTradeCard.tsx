import { colors } from '@toss/tds-colors';
import { Asset, ProgressBar, Text } from '@toss/tds-mobile';
import { activeTrade } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { SectionHeader } from './SectionHeader';
import { TradeStatusBadge } from './TradeStatusBadge';

export function ActiveTradeCard() {
  return (
    <HomeCard>
      <SectionHeader title="진행 중인 거래" actionLabel="전체보기" />

      <button
        type="button"
        style={{
          marginTop: 24,
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: 16,
          border: 'none',
          background: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <Asset.Icon
          name="icon-hourglass-mono"
          frameShape={Asset.frameShape.Circle2XLarge}
          backgroundColor={colors.blue50}
          color={colors.blue500}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <TradeStatusBadge status={activeTrade.status} />

          <div
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <Text typography="t2" fontWeight="bold">
              {activeTrade.amount.toLocaleString()}
            </Text>
            <Text typography="t6" fontWeight="semibold" style={{ marginBottom: 2 }}>
              MS
            </Text>
          </div>

          <Text
            typography="t6"
            color={colors.grey600}
            style={{
              marginTop: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {activeTrade.description}
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            flexShrink: 0,
          }}
        >
          <Text typography="st10" fontWeight="bold" color={colors.blue500}>
            {activeTrade.remainingMinutes}분 남음
          </Text>
          <Asset.Icon
            name="icon-arrow-right-mono"
            color={colors.blue500}
            frameShape={Asset.frameShape.CircleXSmall}
          />
        </div>
      </button>

      <div style={{ marginTop: 24 }}>
        <ProgressBar
          progress={activeTrade.progress}
          size="bold"
          color={colors.blue500}
        />
      </div>
    </HomeCard>
  );
}
