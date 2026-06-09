import { colors } from '@toss/tds-colors';
import { Button, Text } from '@toss/tds-mobile';
import { useLottie } from 'lottie-react';
import { useEffect, useState } from 'react';
import { PageLayout } from '../layout/PageLayout';

const LOTTIE_CATALOG = [
  {
    id: 'loan-ui',
    path: '/lotties/loan-ui.json',
    description:
      '대출 서비스 전체 UI 플로우 애니메이션. 모바일 화면(375×812) 단위로 대출 화면 전환·인터랙션을 시연하는 풀스크린 Lottie.',
  },
  {
    id: 'scroll-arrow',
    path: '/lotties/scroll-arrow.json',
    description:
      '스크롤 유도 화살표 (라이트 테마). 화면 하단에서 위아래로 움직이며 아래로 스크롤하라는 안내용 마이크로 인터랙션.',
  },
  {
    id: 'scroll-arrow-dark',
    path: '/lotties/scroll-arrow-dark.json',
    description:
      '스크롤 유도 화살표 (다크 테마). scroll-arrow.json과 동일 용도이며 어두운 배경 화면에서 사용.',
  },
  {
    id: 'icon-clock',
    path: '/lotties/icon-clock.json',
    description:
      '시계 아이콘 애니메이션. 심사 대기, 처리 중, 예약 시간 안내 등 시간·진행 상태를 나타낼 때 쓰는 200×200 아이콘 Lottie.',
  },
  {
    id: 'icon-document-bluildup',
    path: '/lotties/icon-document-bluildup.json',
    description:
      '문서 쌓기 아이콘 애니메이션 (icon-document-buildup). 서류 제출·서류 검토·심사 단계에서 서류가 차곡차곡 쌓이는 모션.',
  },
  {
    id: 'check-blue-spot',
    path: '/lotties/check-blue-spot.json',
    description:
      '파란 체크 스팟 애니메이션 (2-0-check-spot). 작업 완료·승인·성공 피드백용 체크마크가 나타나는 스팟 이펙트.',
  },
  {
    id: 'free-send-load-koh-check-resizing-2',
    path: '/lotties/free-send-load-koh-check-resizing-2.json',
    description:
      '송금/로딩 완료 체크 아이콘 (free-send-load-koh-check). 송금·이체·처리 완료 시 체크 마크가 그려지는 로딩 완료 모션. 리사이징 버전 2.',
  },
  {
    id: 'icon-credit-check',
    path: '/lotties/icon-credit-check.json',
    description:
      '신용 조회·신용 점수 확인 아이콘. 대출·카드 심사 전 신용 정보 확인 단계에서 사용하는 체크/신용 관련 아이콘 Lottie.',
  },
  {
    id: 'money-winds-loop',
    path: '/lotties/money-winds-loop.json',
    description:
      '돈이 바람에 날리는 루프 애니메이션 (840×840). 소비·지출·돈이 흩어지는 느낌의 반복 모션. 혜택·소비 관련 화면 배경용.',
  },
  {
    id: 'spending-sliver-money-stack-250-2',
    path: '/lotties/spending-sliver-money-stack-250-2.json',
    description:
      '지출·돈 더미 스택 애니메이션 (400×400, 250px 리사이징 v2). 현금이 쌓이거나 지출되는 모션. 소비·저축·잔액 안내 화면용.',
  },
  {
    id: 'data-usage-roulette-mockup-100',
    path: '/lotties/data-usage-roulette-mockup-100.json',
    description:
      '데이터 사용량 룰렛 목업 (375×280, 100% 스케일). 통신·데이터 요금제 선택·사용량 안내 화면에서 룰렛 UI가 돌아가는 목업 애니메이션.',
  },
] as const;

type LottieMeta = {
  v?: string;
  nm?: string;
  w?: number;
  h?: number;
  fr?: number;
  ip?: number;
  op?: number;
  layers?: unknown[];
  assets?: unknown[];
};

const cardStyle = {
  padding: 16,
  border: `1px solid ${colors.grey200}`,
  borderRadius: 16,
  background: colors.background,
} as const;

function formatDuration(fr: number, ip: number, op: number) {
  const seconds = (op - ip) / fr;
  return `${seconds.toFixed(1)}초`;
}

type LottiePreviewContentProps = {
  data: object;
  width: number;
  height: number;
  loop: boolean;
  onToggleLoop: () => void;
};

function LottiePreviewContent({
  data,
  width,
  height,
  loop,
  onToggleLoop,
}: LottiePreviewContentProps) {
  const [playing, setPlaying] = useState(true);

  const { View, play, pause, goToAndPlay } = useLottie(
    {
      animationData: data,
      loop,
      autoplay: true,
    },
    { width, height },
  );

  const togglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
    setPlaying((prev) => !prev);
  };

  const restart = () => {
    goToAndPlay(0);
    setPlaying(true);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: colors.grey100,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${colors.grey200}`,
        }}
      >
        {View}
      </div>

      <div
        style={{
          marginTop: 12,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
        }}
      >
        <Button size="small" onClick={togglePlay}>
          {playing ? '일시정지' : '재생'}
        </Button>
        <Button size="small" color="dark" variant="weak" onClick={restart}>
          처음부터
        </Button>
        <Button size="small" color="dark" variant="weak" onClick={onToggleLoop}>
          반복: {loop ? 'ON' : 'OFF'}
        </Button>
      </div>
    </>
  );
}

type LottiePreviewCardProps = {
  path: string;
  description: string;
};

function LottiePreviewCard({ path, description }: LottiePreviewCardProps) {
  const [data, setData] = useState<object | null>(null);
  const [meta, setMeta] = useState<LottieMeta | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<LottieMeta & object>;
      })
      .then((json) => {
        if (cancelled) return;

        setData(json);
        setMeta({
          v: json.v,
          nm: json.nm,
          w: json.w,
          h: json.h,
          fr: json.fr,
          ip: json.ip,
          op: json.op,
          layers: json.layers,
          assets: json.assets,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  const fileName = path.split('/').pop() ?? path;
  const previewWidth =
    meta?.w != null ? Math.min(meta.w, 320) : 200;
  const previewHeight =
    meta?.w != null && meta?.h != null
      ? Math.round(previewWidth * (meta.h / meta.w))
      : 200;

  return (
    <article style={cardStyle}>
      <Text typography="t4" fontWeight="semibold">
        {meta?.nm ?? fileName}
      </Text>
      <Text typography="t6" style={{ marginTop: 4, color: colors.grey600 }}>
        {description}
      </Text>
      <Text typography="t7" style={{ marginTop: 4, color: colors.grey500 }}>
        {path}
      </Text>

      {meta?.fr != null && meta.ip != null && meta.op != null && (
        <div style={{ marginTop: 12 }}>
          <Text typography="t6">
            {meta.w} × {meta.h}px · {meta.fr}fps ·{' '}
            {formatDuration(meta.fr, meta.ip, meta.op)}
          </Text>
          <Text typography="t7" style={{ marginTop: 4, color: colors.grey500 }}>
            Lottie v{meta.v} · 레이어 {meta.layers?.length ?? 0}개 · 에셋{' '}
            {meta.assets?.length ?? 0}개
          </Text>
        </div>
      )}

      {error && (
        <Text typography="t6" style={{ marginTop: 12, color: colors.red500 }}>
          불러오기 실패: {error}
        </Text>
      )}

      {data && meta?.w != null && meta.h != null && (
        <div style={{ marginTop: 16 }}>
          <LottiePreviewContent
            key={`${path}-${loop}`}
            data={data}
            width={previewWidth}
            height={previewHeight}
            loop={loop}
            onToggleLoop={() => setLoop((prev) => !prev)}
          />
        </div>
      )}

      {!data && !error && (
        <Text typography="t6" style={{ marginTop: 16 }}>
          불러오는 중…
        </Text>
      )}
    </article>
  );
}

export function LottieTestPage() {
  return (
    <PageLayout
      title="Lottie 테스트"
      subtitle="?page=lottie 로 접속 · public/lotties 애니메이션 미리보기"
      hideCta
    >
      <div
        style={{
          padding: '0 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {LOTTIE_CATALOG.map((item) => (
          <LottiePreviewCard
            key={item.id}
            path={item.path}
            description={item.description}
          />
        ))}
      </div>
    </PageLayout>
  );
}
