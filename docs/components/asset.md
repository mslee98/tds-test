# Asset (Icon / Image / Text)

## Import

```tsx
import { Asset } from '@toss/tds-mobile';
```

`Asset`은 namespace입니다. 래핑된 컴포넌트:

| 컴포넌트 | 구조 | 용도 |
|----------|------|------|
| `Asset.Icon` | Frame + ContentIcon | mono 아이콘 (`name`) |
| `Asset.Image` | Frame + ContentImage | 이미지 URL (`src`) |
| `Asset.Text` | Frame + ContentText | 프레임 안 텍스트 |
| `Asset.Lottie` | Frame + ContentLottie | Lottie |
| `Asset.Video` | Frame + ContentVideo | 비디오 |

## TDS 타입 (`index.d.ts`)

### 공통 (`AssetCommonType`)

```ts
frameShape?: AssetFrameShapeType;
backgroundColor?: string;
acc?: ReactNode;              // 뱃지·점 등 부가 요소
accPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
overlap?: { color: string };  // 겹침 효과
```

### Asset.Icon (`AssetIconProps`)

```ts
name: string;    // 예: 'icon-alarm-mono'
color?: string;  // mono 아이콘 색상
// + frameShape, backgroundColor, acc ...
```

### Asset.Image (`AssetImageProps`)

```ts
src: string;
alt?: string;
scale?: number;
scaleType?: 'fit' | 'crop';
// + frameShape, backgroundColor ...
```

### frameShape 프리셋 (`Asset.frameShape`)

| 프리셋 | 크기(대략) | 이 프로젝트 용도 |
|--------|------------|------------------|
| `CircleXSmall` | 24px | 인라인 보조 아이콘 |
| `CircleSmall` | 30px | 하단 탭 |
| `CircleLarge` | 40px | 퀵액션·내역 아이콘 |
| `Circle2XLarge` | 60px | 진행 중 거래 |
| `SquircleMedium` | 36px | 제휴처 이미지 |

## 공식 문서 핵심

1. **Frame**이 모든 Asset의 기반 — 크기·모양·배경 통일
2. `frameShape` 프리셋 우선 사용 (수동 width/height는 acc 등 특수 케이스)
3. `acc` + `accPosition`으로 알림 뱃지 표시
4. div로 아이콘 감싸지 말고 `backgroundColor`를 Asset에 직접

## 이 프로젝트 구조

헬퍼: `src/components/home/homeAssets.tsx`

| 헬퍼 | TDS | 역할 |
|------|-----|------|
| `FramedIcon` | `Asset.Icon` | acc 지원 아이콘 래퍼 |
| `FramedImage` | `Asset.Image` | 이모지·이미지 |
| `HomeMediaAsset` | Icon 또는 Image | 제휴처·내역 공통 |
| `NotificationCountAcc` | `Asset.Text` | 알림 숫자 acc |
| `NotificationDotAcc` | `Asset.Text` | 읽지 않음 점 acc |

## 사용처별 코드

### 1. 알림 버튼 + acc (`HomeHeader.tsx`)

```tsx
<FramedIcon
  name="icon-alarm-mono"
  frameShape={Asset.frameShape.CircleLarge}
  backgroundColor={colors.background}
  color={colors.grey900}
  acc={notificationCount > 0 ? <NotificationCountAcc count={3} /> : undefined}
/>
```

### 2. 퀵액션 원형 버튼 (`BalanceCard.tsx`)

```tsx
<Asset.Icon
  name="icon-plus-mono"
  frameShape={Asset.frameShape.CircleLarge}
  backgroundColor={colors.blue500}
  color={colors.background}
/>
```

### 3. 제휴처 이모지 (`PartnerCard.tsx` + mock)

```tsx
<Asset.Image
  src="https://static.toss.im/2d-emojis/svg/u1F6CD.svg"
  alt="A몰"
  frameShape={Asset.frameShape.SquircleMedium}
  backgroundColor={colors.blue50}
  scale={0.55}
/>
```

### 4. 하단 탭 + 읽지 않음 점 (`HomeBottomNav.tsx`)

```tsx
<FramedIcon
  name="icon-alarm-mono"
  frameShape={Asset.frameShape.CircleSmall}
  color={isActive ? colors.blue500 : colors.grey500}
  acc={<NotificationDotAcc />}
/>
```

## Before → After

```tsx
// ❌ div로 프레임 직접 구현
<div style={{ width: 48, borderRadius: '50%', backgroundColor: colors.blue500 }}>
  <Asset.Icon name="..." frameShape={{ width: 28, height: 28 }} />
</div>

// ✅ Asset에 frameShape + backgroundColor
<Asset.Icon
  name="icon-plus-mono"
  frameShape={Asset.frameShape.CircleLarge}
  backgroundColor={colors.blue500}
  color={colors.background}
/>
```

## 체크리스트

- [ ] 아이콘 이름은 `-mono` 접미사 (색상 변경 가능)
- [ ] `frameShape` 프리셋 우선 (`Asset.frameShape.CircleLarge` 등)
- [ ] 알림·상태 점은 `acc` 패턴
- [ ] Asset은 클릭 불가 → `AssetButton`으로 감싸기

## 다음 학습

- [Text](./text.md) — `Asset.Text` acc 내부에서 함께 사용
- [home-screen](../home-screen.md) — Asset이 쓰인 화면 전체
