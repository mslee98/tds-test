# TDS Mobile 학습 노트

`@toss/tds-mobile` / `@toss/tds-colors`를 **node_modules 타입 정의**와 **이 프로젝트 실제 코드** 기준으로 정리한 문서입니다.

## 패키지 정보

| 패키지 | 버전 | 역할 |
|--------|------|------|
| `@toss/tds-mobile` | 2.4.0 | UI 컴포넌트 |
| `@toss/tds-colors` | (peer) | 색상 토큰 |
| `@toss/tds-mobile-ait` | 2.4.0 | Provider (`TDSMobileAITProvider`) |

타입 정의 위치: `node_modules/@toss/tds-mobile/dist/esm/index.d.ts`

## 학습 순서 (권장)

메인 화면(`HomePage`)에서 쓰인 순서대로 읽으면 흐름이 자연스럽습니다.

1. [colors](./colors.md) — 색상 토큰 (모든 컴포넌트 공통)
2. [Text](./components/text.md) — 텍스트 계층
3. [Asset](./components/asset.md) — 아이콘·이미지 (Frame 구조)
4. [TextButton](./components/text-button.md) — 보조 액션
5. [Badge](./components/badge.md) — 상태 라벨
6. [ProgressBar](./components/progress-bar.md) — 진행률
7. [home-screen](./home-screen.md) — 메인 UI 전체 매핑

DevTools / 레이아웃에서 추가로 쓰인 컴포넌트:

8. [Button](./components/button.md)
9. [Top](./components/top.md)
10. [FixedBottomCTA](./components/fixed-bottom-cta.md)

## 프로젝트 화면별 TDS 사용

| 화면 | 경로 | 주요 TDS |
|------|------|----------|
| 메인 | `src/pages/HomePage.tsx` | Text, Asset, TextButton, Badge, ProgressBar |
| DevTools | `src/pages/DevToolsPage.tsx` | Text, Button, Top(간접) |
| 페이지 레이아웃 | `src/layout/PageLayout.tsx` | Top, FixedBottomCTA |

## 문서 읽는 법

각 컴포넌트 문서는 아래 섹션으로 통일되어 있습니다.

1. **Import** — 어떻게 가져오는지
2. **TDS 타입 (node_modules)** — `index.d.ts` 기준 필수 props
3. **공식 문서 요약** — TDS 가이드 핵심
4. **이 프로젝트 사용처** — 파일·역할
5. **코드 예시** — 실제 작성한 코드
6. **체크리스트** — 적용 시 확인할 것

## 아직 문서화하지 않은 TDS (확장 학습용)

`node_modules/@toss/tds-mobile`에 있으나 이 프로젝트 메인 UI에서는 미사용:

- `ListRow`, `ListHeader`, `GridList`
- `useDialog`, `useToast`, `useBottomSheet`
- `Tab`, `SegmentedControl`
- `TextField`, `SearchField`

메인 UI를 ListRow 기반으로 리팩터링할 때 위 컴포넌트 문서를 추가하면 됩니다.
