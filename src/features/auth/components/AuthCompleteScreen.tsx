import { colors } from '@toss/tds-colors';
import { FixedBottomCTA, Text } from '@toss/tds-mobile';
import { useLottie, type LottieRefCurrentProps } from 'lottie-react';
import { useEffect, useRef, useState } from 'react';

/** Lottie nm: "2-0-check-spot" */
const CHECK_SPOT_LOTTIE_SRC = '/lotties/check-blue-spot.json';
const LOTTIE_SIZE = 200;
/** 체크 동그라미가 나타나기 시작하는 프레임 (0~35: 물방울 낙하, 28~: 체크 등장) */
const TEXT_REVEAL_FRAME = 28;
const TEXT_FADE_MS = 450;

type CheckSpotLottieProps = {
  animationData: object;
  onRevealText: () => void;
};

function CheckSpotLottie({ animationData, onRevealText }: CheckSpotLottieProps) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const revealedRef = useRef(false);
  const onRevealTextRef = useRef(onRevealText);
  onRevealTextRef.current = onRevealText;

  const revealText = () => {
    if (revealedRef.current) {
      return;
    }
    revealedRef.current = true;
    onRevealTextRef.current();
  };

  const { View } = useLottie(
    {
      animationData,
      loop: false,
      autoplay: true,
      lottieRef,
      onEnterFrame: () => {
        const frame = lottieRef.current?.animationItem?.currentFrame ?? 0;
        if (frame >= TEXT_REVEAL_FRAME) {
          revealText();
        }
      },
      onComplete: revealText,
    },
    { width: LOTTIE_SIZE, height: LOTTIE_SIZE },
  );

  useEffect(() => {
    const fallbackMs = (TEXT_REVEAL_FRAME / 29.97) * 1000 + 50;
    const timer = window.setTimeout(revealText, fallbackMs);
    return () => window.clearTimeout(timer);
  }, []);

  return View;
}

type AuthCompleteScreenProps = {
  /** 상단 보조 문구 — 예: 가입 완료!, 로그인 완료! */
  subtitle: string;
  /** 환영 대상 이름 — 예: 홍길동 (없으면 이름 줄 생략) */
  name?: string;
  ctaLabel?: string;
  onCtaClick: () => void;
};

export function AuthCompleteScreen({
  subtitle,
  name,
  ctaLabel = '시작하기',
  onCtaClick,
}: AuthCompleteScreenProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(CHECK_SPOT_LOTTIE_SRC)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleRevealText = () => setTextVisible(true);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main
        className="flex flex-1 flex-col items-center justify-center px-6"
        style={{ paddingBottom: 80 }}
      >
        <div
          className="flex items-center justify-center"
          style={{ marginBottom: 24, minHeight: LOTTIE_SIZE }}
        >
          {animationData ? (
            <CheckSpotLottie
              animationData={animationData}
              onRevealText={handleRevealText}
            />
          ) : null}
        </div>

        <div
          className="flex w-full flex-col items-center text-center"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: `opacity ${TEXT_FADE_MS}ms ease-out, transform ${TEXT_FADE_MS}ms ease-out`,
          }}
        >
          <Text typography="t5" fontWeight="medium" color={colors.grey600}>
            {subtitle}
          </Text>

          {name ? (
            <>
              <Text
                typography="t1"
                fontWeight="bold"
                color={colors.grey900}
                style={{ marginTop: 16 }}
              >
                {name}님,
              </Text>
              <Text typography="t1" fontWeight="bold" color={colors.grey900}>
                환영해요!
              </Text>
            </>
          ) : (
            <Text
              typography="t1"
              fontWeight="bold"
              color={colors.grey900}
              style={{ marginTop: 16 }}
            >
              환영해요!
            </Text>
          )}
        </div>
      </main>

      <FixedBottomCTA onClick={onCtaClick}>{ctaLabel}</FixedBottomCTA>
    </div>
  );
}
