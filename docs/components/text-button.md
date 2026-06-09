# TextButton

## Import

```tsx
import { TextButton } from '@toss/tds-mobile';
```

## TDS 타입 (`index.d.ts` L28376)

```ts
export type TextButtonProps = {
  disabled?: boolean;
  size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  variant?: 'arrow' | 'underline' | 'clear';  // default: 'clear'
  arrowPlacement?: 'inline' | 'block';        // variant='arrow'일 때
} & ParagraphTextProps;
```

`ParagraphTextProps`를 확장하므로 `color`, `fontWeight` 등 Text 계열 props도 사용 가능.

## 공식 문서 요약

| variant | 용도 |
|---------|------|
| `clear` | 기본 텍스트 버튼 |
| `arrow` | 오른쪽 화살표 자동 부착 (이동·더보기) |
| `underline` | 밑줄 스타일 |

## 이 프로젝트 사용처

| 파일 | 라벨 | props |
|------|------|-------|
| `SectionHeader.tsx` | "전체보기" | `size="small"`, `variant="arrow"`, `color={colors.grey500}` |
| `BalanceCard.tsx` | "내 지갑" | `size="small"`, `variant="arrow"`, `color={colors.grey600}` |

## 코드 예시

```tsx
// src/components/home/SectionHeader.tsx
<TextButton
  size="small"
  variant="arrow"
  color={colors.grey500}
  onClick={onActionClick}
>
  {actionLabel}
</TextButton>
```

원본 Tailwind 스펙의 `ChevronRight` + "전체보기" 조합을 TDS에서는 `variant="arrow"` 한 줄로 대체.

## Button vs TextButton

| | TextButton | Button |
|--|------------|--------|
| 용도 | 보조·이동 링크 | 주요 CTA |
| 이 프로젝트 | 전체보기, 내 지갑 | DevTools 테스트 버튼 |

## 체크리스트

- [ ] 페이지 주요 완료 액션은 `FixedBottomCTA` / `Button` 사용
- [ ] 카드 헤더·보조 링크는 `TextButton variant="arrow"`
- [ ] `size`는 주변 Text typography와 시각적 균형 맞추기 (`small` 권장)

## 다음 학습

- [Button](./button.md)
- [FixedBottomCTA](./fixed-bottom-cta.md)
