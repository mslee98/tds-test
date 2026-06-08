import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { histories } from '../../mocks/homeMock';
import type { HistoryItem } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { FramedImage } from './homeAssets';
import { SectionHeader } from './SectionHeader';

function HistoryAsset({ history }: { history: HistoryItem }) {
  if (history.imageSrc) {
    return (
      <FramedImage
        src={history.imageSrc}
        alt={history.title}
        backgroundColor={history.iconBg}
        frameShape={Asset.frameShape.CircleLarge}
      />
    );
  }

  return (
    <Asset.Icon
      name={history.iconName ?? 'icon-plus-mono'}
      frameShape={Asset.frameShape.CircleLarge}
      backgroundColor={history.iconBg}
      color={history.iconColor ?? colors.grey700}
    />
  );
}

function HistoryRow({ history }: { history: HistoryItem }) {
  const isPlus = history.amount > 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <HistoryAsset history={history} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          typography="t5"
          fontWeight="bold"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {history.title}
        </Text>
        <Text typography="st11" color={colors.grey500} style={{ marginTop: 4 }}>
          {history.date}
        </Text>
      </div>

      <div style={{ textAlign: 'right' }}>
        <Text
          typography="st8"
          fontWeight="bold"
          color={isPlus ? colors.blue500 : colors.grey900}
        >
          {isPlus ? '+' : '-'}
          {Math.abs(history.amount).toLocaleString()} MS
        </Text>
        <Text typography="st11" color={colors.grey500} style={{ marginTop: 4 }}>
          {history.status}
        </Text>
      </div>
    </div>
  );
}

export function RecentHistoryCard() {
  return (
    <HomeCard>
      <SectionHeader title="최근 내역" actionLabel="전체보기" />

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {histories.map((history) => (
          <HistoryRow key={history.id} history={history} />
        ))}
      </div>
    </HomeCard>
  );
}
