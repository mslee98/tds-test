import type { TradeStatus } from './TradeStatusBadge';

/** 제휴처·내역 등에서 공통으로 쓰는 미디어 에셋 필드 */
export type HomeMediaAssetData = {
  imageSrc?: string;
  iconName?: string;
  iconColor?: string;
  iconBg: string;
  label: string;
};

export type { TradeStatus };
