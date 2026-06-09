import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { useState } from 'react';
import { FramedIcon } from './homeAssets';

type NavItem = {
  id: string;
  label: string;
  iconName: string;
};

/** 토스 메인 탭바와 동일한 5탭 구성 */
const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '홈', iconName: 'icon-home-mono' },
  { id: 'benefit', label: '혜택', iconName: 'icon-diamond-mono' },
  { id: 'transfer', label: '송금', iconName: 'icon-won-mono' },
  { id: 'stock', label: '주식', iconName: 'icon-graph-bar-mono' },
  { id: 'all', label: '전체', iconName: 'icon-line-three-mono' },
];

export function HomeBottomNav() {
  const [activeId, setActiveId] = useState('home');

  return (
    <footer className="w-full bg-background pb-[env(safe-area-inset-bottom,0px)]">
      <nav aria-label="주요 탐색" className="flex w-full px-1 pt-2.5 pb-2">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          const itemColor = isActive ? colors.grey900 : colors.grey400;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className="flex min-h-[54px] flex-1 cursor-pointer flex-col items-center justify-center gap-1 border-none bg-transparent px-1 py-1.5"
            >
              <FramedIcon
                name={item.iconName}
                frameShape={Asset.frameShape.CleanW24}
                color={itemColor}
              />
              <Text
                typography="st13"
                fontWeight={isActive ? 'semibold' : 'medium'}
                color={itemColor}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
