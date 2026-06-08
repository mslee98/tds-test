import { colors } from '@toss/tds-colors';
import { Asset, Text, TextButton } from '@toss/tds-mobile';
import { balanceData } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';

function formatMs(amount: number) {
  return `${amount.toLocaleString()} MS`;
}

type BalanceRowProps = {
  dotColor: string;
  label: string;
  value: string;
  showInfo?: boolean;
};

function BalanceRow({ dotColor, label, value, showInfo }: BalanceRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Asset.Icon
          name="icon-circle-mono"
          color={dotColor}
          frameShape={Asset.frameShape.CircleXSmall}
        />
        <Text typography="st10" color={colors.grey600}>
          {label}
        </Text>
        {showInfo && (
          <Asset.Icon
            name="icon-info-circle-mono"
            color={colors.grey400}
            frameShape={Asset.frameShape.CircleXSmall}
          />
        )}
      </div>
      <Text typography="st10" fontWeight="semibold">
        {value}
      </Text>
    </div>
  );
}

type QuickActionProps = {
  label: string;
  iconName: string;
};

function QuickAction({ label, iconName }: QuickActionProps) {
  return (
    <button
      type="button"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        height: 96,
        border: 'none',
        borderRadius: 22,
        backgroundColor: colors.grey50,
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <Asset.Icon
        name={iconName}
        frameShape={Asset.frameShape.CircleLarge}
        backgroundColor={colors.blue500}
        color={colors.background}
      />
      <Text typography="st10" fontWeight="bold">
        {label}
      </Text>
    </button>
  );
}

export function BalanceCard() {
  return (
    <HomeCard>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Text typography="t5" fontWeight="semibold" color={colors.grey700}>
            내 MS 잔액
          </Text>
          <Asset.Icon
            name="icon-eye-on-mono"
            color={colors.grey400}
            frameShape={Asset.frameShape.CircleXSmall}
          />
        </div>

        <TextButton size="small" color={colors.grey600}>
          내 지갑
        </TextButton>
      </div>

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
        }}
      >
        <Text typography="t1" fontWeight="bold">
          {balanceData.total.toLocaleString()}
        </Text>
        <Text typography="st9" fontWeight="semibold" style={{ marginBottom: 4 }}>
          MS
        </Text>
      </div>

      <div
        style={{
          marginTop: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <BalanceRow
          dotColor={colors.blue500}
          label="사용 가능"
          value={formatMs(balanceData.available)}
        />
        <BalanceRow
          dotColor={colors.grey400}
          label="거래 중"
          value={formatMs(balanceData.inTrade)}
          showInfo
        />
      </div>

      <div
        style={{
          margin: '24px 0',
          height: 1,
          backgroundColor: colors.grey100,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
        }}
      >
        <QuickAction label="충전하기" iconName="icon-plus-mono" />
        <QuickAction label="보내기" iconName="icon-arrow-right-up-mono" />
        <QuickAction label="사용하기" iconName="icon-shopping-bag-mono" />
      </div>
    </HomeCard>
  );
}
