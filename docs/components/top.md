# Top

## Import

```tsx
import { Top } from '@toss/tds-mobile';
```

## TDS 구조

`Top`은 페이지 상단 영역 컴포넌트입니다. 서브 컴포넌트 조합:

| 서브 | 용도 |
|------|------|
| `Top.TitleParagraph` | 페이지 제목 |
| `Top.SubtitleParagraph` | 부제목 |
| `Top.SubtitleBadges` | 제목 아래 Badge 목록 |
| `Top.SubtitleTextButton` | 제목 아래 텍스트 버튼 |

## 이 프로젝트 사용처

`src/layout/PageLayout.tsx` — DevTools 등 `PageLayout` 사용 페이지

```tsx
<Top
  title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
  subtitleBottom={
    subtitle ? (
      <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph>
    ) : undefined
  }
/>
```

메인 `HomePage`는 **Top 미사용** — `HomeHeader`로 커스텀 인사 영역 구성.

## HomeHeader vs Top

| | HomeHeader | Top |
|--|------------|-----|
| 화면 | 메인 홈 | DevTools 등 PageLayout |
| 인사말 | "민성님의 MS" | "MS 거래 솔루션" |
| 알림 | Asset.Icon + acc | (미사용) |

## 체크리스트

- [ ] 일반 서브 페이지는 `Top` + `PageLayout` 패턴
- [ ] 메인 대시보드처럼 특수 UX는 커스텀 헤더 허용

## 다음 학습

- [Text](./text.md) — `Top.TitleParagraph` 내부도 typography 토큰
- [FixedBottomCTA](./fixed-bottom-cta.md) — PageLayout과 쌍으로 사용
