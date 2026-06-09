# Home 화면 — TDS 컴포넌트 매핑

메인 UI (`src/pages/HomePage.tsx`)를 구성하는 블록과 TDS 사용 관계입니다.

## 화면 구조

```
HomePage
├── HomeHeader          → Text, Asset.Icon
├── BalanceCard         → Text, TextButton, Asset.Icon
├── ActiveTradeCard     → SectionHeader, Badge, Text, Asset.Icon, ProgressBar
├── PartnerCard         → SectionHeader, Asset.Image/Icon, Text
├── RecentHistoryCard   → SectionHeader, HomeMediaAsset, Text
└── HomeBottomNav       → Asset.Icon, Text
```

소스: `src/components/home/`

## 섹션별 상세

### HomeHeader

| UI 요소 | TDS | 문서 |
|---------|-----|------|
| "민성님의 MS" | `Text typography="t1"` | [text](./components/text.md) |
| 부제목 | `Text typography="t6"` | [text](./components/text.md) |
| 알림 아이콘 | `Asset.Icon` + `acc` | [asset](./components/asset.md) |

### BalanceCard

| UI 요소 | TDS | 문서 |
|---------|-----|------|
| "내 MS 잔액" | `Text typography="t5"` | [text](./components/text.md) |
| 눈 아이콘 | `Asset.Icon` CircleXSmall | [asset](./components/asset.md) |
| "내 지갑" | `TextButton variant="arrow"` | [text-button](./components/text-button.md) |
| 잔액 숫자 | `Text typography="t1"` | [text](./components/text.md) |
| 사용가능/거래중 | `Asset.Icon` + `Text` | [asset](./components/asset.md) |
| 충전/보내기/사용 | `Asset.Icon` CircleLarge | [asset](./components/asset.md) |

### ActiveTradeCard

| UI 요소 | TDS | 문서 |
|---------|-----|------|
| "진행 중인 거래" | `SectionHeader` | [text-button](./components/text-button.md) |
| "입금 확인 중" | `TradeStatusBadge` → `Badge` | [badge](./components/badge.md) |
| 모래시계 | `Asset.Icon` Circle2XLarge | [asset](./components/asset.md) |
| 진행 바 | `ProgressBar` | [progress-bar](./components/progress-bar.md) |

### PartnerCard / RecentHistoryCard

| UI 요소 | TDS | 문서 |
|---------|-----|------|
| 제휴처·내역 아이콘 | `HomeMediaAsset` | [asset](./components/asset.md) |
| 이름·금액 | `Text` | [text](./components/text.md) |

### HomeBottomNav

| UI 요소 | TDS | 문서 |
|---------|-----|------|
| 탭 아이콘 | `Asset.Icon` CircleSmall | [asset](./components/asset.md) |
| 알림 점 | `acc` → `NotificationDotAcc` | [asset](./components/asset.md) |
| 탭 라벨 | `Text typography="st12"` | [text](./components/text.md) |

## 데이터 흐름

```
src/mocks/homeMock.ts
  ├── balanceData      → BalanceCard
  ├── activeTrade      → ActiveTradeCard (Badge, ProgressBar)
  ├── partners[]       → PartnerCard (Asset.Image)
  └── histories[]      → RecentHistoryCard
```

API 연동 시 mock만 교체하고 TDS 컴포넌트 구조는 유지.

## HomeCard (비-TDS)

`HomeCard.tsx`는 TDS가 아닌 **레이아웃 래퍼** (흰 카드, radius, shadow).  
내부에 TDS 컴포넌트를 조합합니다.

## 학습 루트

1. [docs/README.md](./README.md) 순서대로 컴포넌트 문서 읽기
2. `src/components/home/` 해당 파일 열어 대조
3. `npm run dev` → `http://localhost:5173/` 에서 확인
