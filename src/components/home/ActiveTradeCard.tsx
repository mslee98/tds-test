import { colors } from '@toss/tds-colors';
import { Asset, ListRow, ProgressBar } from '@toss/tds-mobile';
import { activeTrade } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { SectionHeader } from './SectionHeader';
import { TradeStatusBadge } from './TradeStatusBadge';

export function ActiveTradeCard() {
  return (
    <HomeCard className="px-0 py-0">
      <div className="px-5 pt-5">
        <SectionHeader title="진행 중인 거래" actionLabel="전체보기" />
      </div>

      <ListRow
        left={
          <Asset.Icon
            name="icon-hourglass-mono"
            frameShape={Asset.frameShape.CircleLarge}
            backgroundColor={colors.blue50}
            color={colors.blue500}
          />
        }
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={<TradeStatusBadge status={activeTrade.status} />}
            middle={`${activeTrade.amount.toLocaleString()} MS`}
            middleProps={{ fontWeight: 'bold', color: colors.grey900 }}
            bottom={activeTrade.description}
            bottomProps={{ color: colors.grey600 }}
          />
        }
        right={
          <ListRow.Texts
            type="Right1RowTypeE"
            top={`${activeTrade.remainingMinutes}분 남음`}
            topProps={{ fontWeight: 'bold', color: colors.blue500 }}
            marginTop={0}
          />
        }
        verticalPadding="medium"
        arrowType="right"
      />

      <div className="px-5 pb-5">
        <ProgressBar
          progress={activeTrade.progress}
          size="normal"
          color={colors.blue400}
          animate
        />
      </div>
    </HomeCard>
  );
}
