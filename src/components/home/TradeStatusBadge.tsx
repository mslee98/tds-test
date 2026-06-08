import { Badge } from '@toss/tds-mobile';

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

type TradeStatusBadgeProps = {
  status: TradeStatus;
};

export function TradeStatusBadge({ status }: TradeStatusBadgeProps) {
  return (
    <Badge size="small" variant="weak" color={STATUS_COLOR[status]}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
