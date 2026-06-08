import { colors } from '@toss/tds-colors';
import type { TradeStatus } from '../components/home/TradeStatusBadge';

export type Partner = {
  id: string;
  name: string;
  description: string;
  imageSrc?: string;
  iconName?: string;
  iconColor?: string;
  iconBg: string;
};

export type HistoryItem = {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: string;
  imageSrc?: string;
  iconName?: string;
  iconColor?: string;
  iconBg: string;
};

export type BalanceData = {
  total: number;
  available: number;
  inTrade: number;
};

export type ActiveTrade = {
  status: TradeStatus;
  amount: number;
  description: string;
  remainingMinutes: number;
  progress: number;
};

export const balanceData: BalanceData = {
  total: 1_240_000,
  available: 1_200_000,
  inTrade: 40_000,
};

export const activeTrade: ActiveTrade = {
  status: 'confirming',
  amount: 50_000,
  description: '상대방 입금 확인 중이에요.',
  remainingMinutes: 12,
  progress: 0.52,
};

export const partners: Partner[] = [
  {
    id: 'a-mall',
    name: 'A몰',
    description: '쇼핑',
    imageSrc: 'https://static.toss.im/2d-emojis/svg/u1F6CD.svg',
    iconBg: colors.blue50,
  },
  {
    id: 'b-game',
    name: 'B게임',
    description: '게임 충전',
    imageSrc: 'https://static.toss.im/2d-emojis/svg/u1F3AE.svg',
    iconBg: colors.purple50,
  },
  {
    id: 'c-coupon',
    name: 'C쿠폰몰',
    description: '모바일 쿠폰',
    imageSrc: 'https://static.toss.im/2d-emojis/svg/u1F3AB.svg',
    iconBg: colors.green50,
  },
  {
    id: 'more',
    name: '더보기',
    description: '',
    iconName: 'icon-apps-grid-mono',
    iconColor: colors.grey400,
    iconBg: colors.grey100,
  },
];

export const histories: HistoryItem[] = [
  {
    id: 'h1',
    title: 'A몰 결제',
    date: '2024.05.20 14:30',
    amount: -30_000,
    status: '결제 완료',
    imageSrc: 'https://static.toss.im/2d-emojis/svg/u1F6CD.svg',
    iconBg: colors.purple50,
  },
  {
    id: 'h2',
    title: '충전 완료',
    date: '2024.05.20 11:20',
    amount: 100_000,
    status: '충전 완료',
    iconName: 'icon-plus-mono',
    iconColor: colors.green500,
    iconBg: colors.green50,
  },
];
