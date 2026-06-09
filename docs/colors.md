# colors (`@toss/tds-colors`)

## Import

```tsx
import { colors } from '@toss/tds-colors';
```

## 역할

UI 색상 hex를 직접 쓰지 않고 **디자인 토큰**으로 통일합니다.  
워크스페이스 규칙: `#3182F6` 대신 `colors.blue500` 사용.

## 이 프로젝트에서 쓰는 토큰

| 토큰 | 용도 | 사용 파일 예시 |
|------|------|----------------|
| `colors.grey100` | 페이지 배경 | `HomePage.tsx` |
| `colors.grey50` | 카드 내부·퀵액션 배경 | `BalanceCard.tsx` |
| `colors.background` | 흰 배경·아이콘 전경 | `HomeCard.tsx`, `Asset.Icon` |
| `colors.grey400`~`grey700` | 보조 텍스트·아이콘 | 카드 전반 |
| `colors.grey900` | 본문 텍스트 | `HomePage.tsx` |
| `colors.blue50` | 강조 영역 배경 | `ActiveTradeCard.tsx` |
| `colors.blue400` | ProgressBar 기본색 | `ActiveTradeCard.tsx` |
| `colors.blue500` | 액센트·활성 탭 | `BalanceCard`, `HomeBottomNav` |
| `colors.red500` | 알림 뱃지 | `homeAssets.tsx` |
| `colors.green50` / `purple50` | 내역·제휴처 아이콘 배경 | `homeMock.ts` |

## 코드 예시

```tsx
// src/pages/HomePage.tsx
<div style={{ backgroundColor: colors.grey100, color: colors.grey900 }}>

// src/components/home/BalanceCard.tsx
<Text typography="t5" color={colors.grey700}>내 MS 잔액</Text>
<Asset.Icon color={colors.grey400} ... />
```

## 체크리스트

- [ ] `style={{ color: '#6B7684' }}` 같은 hex 직접 입력 금지
- [ ] TDS `Text`의 `color` prop에도 `colors.*` 전달
- [ ] `ProgressBar`의 `color`에도 `colors.blue400` 등 토큰 사용

## 관련 문서

- [Text](./components/text.md) — `color` prop과 함께 사용
- [Asset](./components/asset.md) — `backgroundColor`, `color`
