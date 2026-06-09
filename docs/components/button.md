# Button

## Import

```tsx
import { Button } from '@toss/tds-mobile';
```

## TDS 타입 요약

주요 props (메인 UI보다 DevTools에서 사용):

| prop | 예시 | 설명 |
|------|------|------|
| `color` | `'primary'`, `'dark'` | 버튼 색상 테마 |
| `variant` | `'fill'`, `'weak'` | 채움 / 약한 스타일 |
| `size` | `'small'`, `'medium'` | 크기 |
| `onClick` | handler | 클릭 핸들러 |

## 이 프로젝트 사용처

`src/pages/DevToolsPage.tsx` — PWA·알림 테스트 화면 (`?page=devtools`)

```tsx
<Button color="primary" variant="fill">거래 시작</Button>
<Button color="dark" variant="weak">취소</Button>
<Button onClick={install}>앱처럼 설치하기</Button>
<Button onClick={requestPermission}>알림 권한 요청</Button>
```

메인 `HomePage`에서는 **Button 미사용** — 보조 액션은 `TextButton`, 주요 CTA는 추후 `FixedBottomCTA` 예정.

## TextButton / FixedBottomCTA 와 구분

| 컴포넌트 | 용도 |
|----------|------|
| `TextButton` | 전체보기, 내 지갑 (보조) |
| `Button` | 폼·테스트 화면 일반 액션 |
| `FixedBottomCTA` | 페이지 하단 고정 주요 CTA |

## 체크리스트

- [ ] 메인 완료 액션에 `Button` 단독 fixed 배치 지양 → `FixedBottomCTA`
- [ ] `color="primary"`가 브랜드 액션에 적합

## 다음 학습

- [TextButton](./text-button.md)
- [FixedBottomCTA](./fixed-bottom-cta.md)
