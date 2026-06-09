import { Badge } from '@toss/tds-mobile';

/**
 * 거래 상태 라벨 — TDS Badge 래퍼
 * @see Badge — size, variant(fill|weak), color로 상태 강조 수준 조절
 */
export type TradeStatus = 'pending' | 'confirming' | 'completed' | 'hold';

const STATUS_LABEL: Record<TradeStatus, string> = {
  pending: '입금 대기',
  confirming: '입금 확인 중',
  completed: '완료',
  hold: '보류',
};

const STATUS_COLOR: Record<
  TradeStatus,
  'blue' | 'yellow' | 'green' | 'red'
> = {
  pending: 'yellow',
  confirming: 'blue',
  completed: 'green',
  hold: 'red',
};

/** fill: 주의 필요 / weak: 진행·완료 등 보조 상태 */
const STATUS_VARIANT: Record<TradeStatus, 'fill' | 'weak'> = {
  pending: 'fill',
  confirming: 'weak',
  completed: 'weak',
  hold: 'fill',
};

type TradeStatusBadgeProps = {
  status: TradeStatus;
};

export function TradeStatusBadge({ status }: TradeStatusBadgeProps) {
  return (
    <Badge
      size="xsmall"
      variant={STATUS_VARIANT[status]}
      color={STATUS_COLOR[status]}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
