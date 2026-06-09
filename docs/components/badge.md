# Badge

## Import

```tsx
import { Badge } from '@toss/tds-mobile';
```

## TDS 타입 (`index.d.ts`)

```ts
export interface BadgeProps extends Omit<ParagraphBadgeProps, 'typography'> {
  size: 'large' | 'medium' | 'small' | 'xsmall';
}

// ParagraphBadgeProps
variant: 'fill' | 'weak';
color: 'blue' | 'teal' | 'green' | 'red' | 'yellow' | 'elephant';
children?: ReactNode;
```

## 공식 문서 요약

| variant | 특징 | 사용 시점 |
|---------|------|-----------|
| `fill` | 채도 높음, 눈에 띔 | 주의·강조 상태 |
| `weak` | 채도 낮음 | 진행 중·완료 등 보조 |

| size | |
|------|--|
| `xsmall` ~ `large` | 라벨 크기 |

## 이 프로젝트 사용처

`src/components/home/TradeStatusBadge.tsx` — 거래 상태 전용 래퍼

| status | label | variant | color |
|--------|-------|---------|-------|
| `pending` | 입금 대기 | fill | yellow |
| `confirming` | 입금 확인 중 | weak | blue |
| `completed` | 완료 | weak | green |
| `hold` | 보류 | fill | red |

사용 위치: `ActiveTradeCard.tsx`

## 코드 예시

```tsx
// src/components/home/TradeStatusBadge.tsx
export function TradeStatusBadge({ status }: { status: TradeStatus }) {
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
```

확장 시 `STATUS_LABEL` / `STATUS_COLOR` / `STATUS_VARIANT` 맵만 추가하면 됩니다.

## 커스텀 span vs Badge

초기 Tailwind 스펙의 커스텀 `<span className="...">` 대신 TDS `Badge`를 쓰면:

- typography·색상 토큰 자동 적용
- `fill`/`weak`로 상태 강조 수준 통일
- 이후 `입금 대기` / `확인 중` / `완료` / `보류` 확장 용이

## 체크리스트

- [ ] `variant`, `color`, `size` 모두 명시 (타입상 필수)
- [ ] hex 배경 커스텀 Badge 만들지 않기
- [ ] 상태 종류가 늘면 `TradeStatus` union + 맵 객체로 관리

## 다음 학습

- [ProgressBar](./progress-bar.md) — Badge와 함께 `ActiveTradeCard`에서 사용
