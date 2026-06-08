import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { useState } from 'react';
import { NotificationDotAcc } from './homeAssets';

type NavItem = {
  id: string;
  label: string;
  iconName: string;
  hasDot?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', iconName: 'icon-home-mono' },
  { id: 'trade', label: '거래', iconName: 'icon-arrow-left-right-mono' },
  { id: 'wallet', label: '지갑', iconName: 'icon-wallet-mono' },
  {
    id: 'alarm',
    label: '알림',
    iconName: 'icon-alarm-mono',
    hasDot: true,
  },
  { id: 'my', label: 'MY', iconName: 'icon-user-mono' },
];

export function HomeBottomNav() {
  const [activeId, setActiveId] = useState('home');

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        width: '100%',
        maxWidth: 430,
        padding: '0 16px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          borderRadius: 28,
          backgroundColor: colors.background,
          padding: '12px 8px',
          boxShadow: '0 -8px 30px rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  border: 'none',
                  background: 'none',
                  padding: '8px 0',
                  cursor: 'pointer',
                }}
              >
                <Asset.Icon
                  name={item.iconName}
                  frameShape={Asset.frameShape.CircleSmall}
                  color={isActive ? colors.blue500 : colors.grey500}
                  acc={item.hasDot ? <NotificationDotAcc /> : undefined}
                  accPosition="top-right"
                />
                <Text
                  typography="st12"
                  fontWeight="bold"
                  color={isActive ? colors.blue500 : colors.grey500}
                >
                  {item.label}
                </Text>
              </button>
            );
          })}
        </div>

        <div
          style={{
            margin: '8px auto 0',
            width: 128,
            height: 4,
            borderRadius: 999,
            backgroundColor: colors.grey900,
          }}
        />
      </div>
    </nav>
  );
}
