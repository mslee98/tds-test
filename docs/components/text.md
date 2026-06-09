# Text

## Import

```tsx
import { Text } from '@toss/tds-mobile';
```

## TDS 타입 (`index.d.ts`)

```ts
// export { Text_2 as Text }
// ComponentWithAs<"div", TextProps>
// ParagraphTextProps 기반 — typography, fontWeight, color 등
```

핵심 props:

| prop | 타입 | 설명 |
|------|------|------|
| `typography` | `MobileTypography` | `t1`~`t7`, `st1`~`st13` 등 토큰 (**필수**) |
| `fontWeight` | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | 굵기 |
| `color` | `string` | `colors.*` 토큰 권장 |
| `style` | `CSSProperties` | margin 등 레이아웃만 (fontSize 직접 지정 금지) |

## 공식 문서 요약

- `fontSize` / `lineHeight` px 하드코딩 대신 **typography 토큰** 사용
- 제목: `t1`~`t3` + `bold`/`semibold`
- 본문: `t5` + `regular`
- 보조·캡션: `t6`~`t7`, `st11`~`st13`

## 이 프로젝트 사용처

| 파일 | typography | 용도 |
|------|------------|------|
| `HomeHeader.tsx` | `t1`, `t6` | 인사 제목·부제 |
| `BalanceCard.tsx` | `t1`, `t5`, `st9`, `st10` | 잔액·라벨 |
| `ActiveTradeCard.tsx` | `t2`, `t6`, `st10` | 거래 금액·남은 시간 |
| `SectionHeader.tsx` | `st7` | 섹션 제목 |
| `PartnerCard.tsx` | `t6`, `st12` | 제휴처 이름·설명 |
| `RecentHistoryCard.tsx` | `t5`, `st8`, `st11` | 내역 제목·금액·날짜 |
| `HomeBottomNav.tsx` | `st12` | 탭 라벨 |
| `homeAssets.tsx` | `st13` | 알림 숫자 (acc 내부) |
| `DevToolsPage.tsx` | `t3`, `t5`, `t6` | 테스트 화면 본문 |

## 코드 예시

```tsx
// src/components/home/HomeHeader.tsx
<Text typography="t1" fontWeight="bold">
  {userName}님의 MS 👋
</Text>
<Text typography="t6" color={colors.grey600} style={{ marginTop: 8 }}>
  오늘도 안전하고 편리하게 거래하세요.
</Text>

// src/components/home/BalanceCard.tsx — 금액 강조
<Text typography="t1" fontWeight="bold">
  {balanceData.total.toLocaleString()}
</Text>
<Text typography="st9" fontWeight="semibold" style={{ marginBottom: 4 }}>
  MS
</Text>
```

## 체크리스트

- [ ] `typography` 없이 Text 사용하지 않기
- [ ] `style={{ fontSize: 17 }}` 사용하지 않기
- [ ] 계층이 한 단계 차이날 때 `t` / `st` 토큰 번갈아 사용

## 다음 학습

- [TextButton](./text-button.md) — 클릭 가능한 텍스트 액션
- [Badge](./badge.md) — 상태 라벨 (별도 컴포넌트)
