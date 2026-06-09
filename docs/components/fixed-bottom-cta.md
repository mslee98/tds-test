# FixedBottomCTA

## Import

```tsx
import { FixedBottomCTA } from '@toss/tds-mobile';
// 또는
import { BottomCTA } from '@toss/tds-mobile';
// <BottomCTA fixed> 와 동일
```

## TDS 타입 요약

| prop | 설명 |
|------|------|
| `onClick` | CTA 클릭 |
| `children` | 버튼 라벨 |
| `fixed` | `FixedBottomCTA`는 기본 true |
| `hasSafeAreaPadding` | 하단 safe area (기본 true) |
| `hideOnScroll` | 스크롤 시 숨김 |
| `topAccessory` / `bottomAccessory` | CTA 위·아래 보조 UI |

Double 버튼: `FixedBottomCTA.Double` + `leftButton` / `rightButton`

## 이 프로젝트 사용처

`src/layout/PageLayout.tsx`

```tsx
{showCta && (
  <FixedBottomCTA onClick={onCtaClick}>{ctaLabel}</FixedBottomCTA>
)}
```

현재 DevTools는 `hideCta`로 CTA 숨김.  
메인 `HomePage`는 `HomeBottomNav` 커스텀 탭 사용.

## 언제 쓸까

- 페이지 **주요 완료·다음** 액션 1개
- 취소+확인 2개 → `FixedBottomCTA.Double`

메인 홈의 "충전하기" 등은 카드 내 퀵액션이므로 FixedBottomCTA 대상이 아님.

## 체크리스트

- [ ] 본문 `paddingBottom`으로 CTA 가림 방지 (`PageLayout`의 `CTA_RESERVED_HEIGHT`)
- [ ] `useToast` 시 `higherThanCTA: true` 옵션 고려

## 다음 학습

- [Button](./button.md)
- [TextButton](./text-button.md)
