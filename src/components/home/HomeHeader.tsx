import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { AssetButton, NotificationCountAcc } from './homeAssets';

type HomeHeaderProps = {
  userName?: string;
  notificationCount?: number;
};

export function HomeHeader({
  userName = '민성',
  notificationCount = 3,
}: HomeHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Text typography="t1" fontWeight="bold">
          {userName}님의 MS 👋
        </Text>
        <Text typography="t6" color={colors.grey600} style={{ marginTop: 8 }}>
          오늘도 안전하고 편리하게 거래하세요.
        </Text>
      </div>

      <div style={{ marginTop: 4 }}>
        <AssetButton aria-label="알림">
          <Asset.Icon
            name="icon-alarm-mono"
            frameShape={Asset.frameShape.CircleLarge}
            backgroundColor={colors.background}
            color={colors.grey900}
            acc={
              notificationCount > 0 ? (
                <NotificationCountAcc count={notificationCount} />
              ) : undefined
            }
            accPosition="top-right"
          />
        </AssetButton>
      </div>
    </header>
  );
}
