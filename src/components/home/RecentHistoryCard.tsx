import { colors } from '@toss/tds-colors';
import { Asset, ListRow } from '@toss/tds-mobile';
import { histories } from '../../mocks/homeMock';
import type { HistoryItem } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { HomeMediaAsset } from './homeAssets';
import { SectionHeader } from './SectionHeader';

function HistoryListRow({ history }: { history: HistoryItem }) {
  const isPlus = history.amount > 0;
  const amountLabel = `${isPlus ? '+' : '-'}${Math.abs(history.amount).toLocaleString()} MS`;

  return (
    <ListRow
      left={
        <HomeMediaAsset
          imageSrc={history.imageSrc}
          iconName={history.iconName}
          iconColor={history.iconColor}
          iconBg={history.iconBg}
          label={history.title}
          frameShape={Asset.frameShape.CircleSmall}
          scale={0.5}
        />
      }
      contents={
        <ListRow.Texts
          type="2RowTypeA"
          top={history.title}
          topProps={{ fontWeight: 'bold', color: colors.grey800 }}
          bottom={history.date}
          bottomProps={{ color: colors.grey500 }}
        />
      }
      right={
        <ListRow.Texts
          type="Right2RowTypeB"
          top={amountLabel}
          topProps={{
            fontWeight: 'bold',
            color: isPlus ? colors.blue500 : colors.grey900,
          }}
          bottom={history.status}
          bottomProps={{ color: colors.grey500 }}
        />
      }
      verticalPadding="medium"
    />
  );
}

export function RecentHistoryCard() {
  return (
    <HomeCard className="px-0 py-0">
      <div className="px-5 pt-5">
        <SectionHeader title="최근 내역" actionLabel="전체보기" />
      </div>

      <div className="mt-1">
        {histories.map((history) => (
          <HistoryListRow key={history.id} history={history} />
        ))}
      </div>
    </HomeCard>
  );
}
