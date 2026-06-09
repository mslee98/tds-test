# ProgressBar

## Import

```tsx
import { ProgressBar } from '@toss/tds-mobile';
```

## TDS 타입 (`index.d.ts` L13862)

```ts
type ProgressBarProps = {
  progress: number;           // 0.0 ~ 1.0 (필수)
  size: 'light' | 'normal' | 'bold';
  color?: string;             // default: colors.blue400
  animate?: boolean;          // default: false
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;
```

## 공식 문서 요약

```tsx
<ProgressBar progress={0.5} size="normal" />
<ProgressBar progress={0.7} size="bold" color={colors.blue400} animate />
```

- `progress={0.52}` → 52% 진행
- `animate` → progress 값 변경 시 부드러운 전환

## 이 프로젝트 사용처

`src/components/home/ActiveTradeCard.tsx` — 진행 중 거래 카드 하단

데이터: `src/mocks/homeMock.ts` → `activeTrade.progress = 0.52`

## 코드 예시

```tsx
// src/components/home/ActiveTradeCard.tsx
<ProgressBar
  progress={activeTrade.progress}
  size="bold"
  color={colors.blue400}
  animate
/>
```

Tailwind 스펙의 커스텀 `<div className="h-2 w-[52%] bg-blue...">` 를 TDS `ProgressBar`로 대체.

## size 선택 가이드

| size | 용도 |
|------|------|
| `light` | 얇은 보조 진행 표시 |
| `normal` | 일반 |
| `bold` | 카드 내 주요 진행 (현재 사용) |

## 체크리스트

- [ ] progress는 0~1 사이 (퍼센트 52 → `0.52`)
- [ ] 색상은 `colors.blue400` 등 토큰
- [ ] 로딩·단계 UI에 재사용 가능

## 다음 학습

- [Badge](./badge.md) — 같은 카드에서 상태+진행률 조합
