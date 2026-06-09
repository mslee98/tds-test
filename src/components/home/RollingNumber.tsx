import { useEffect, useMemo, useRef, useState } from 'react';

const BASE_TRACK_TRANSITION_MS = 1400;
const TRACK_EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const DIGIT_ANIMATION_START_MS = 50;
const CHAR_REVEAL_MS = 65;
const MIN_LOOP_ROUNDS = 2;
const MAX_LOOP_ROUNDS = 5;

type DigitProps = {
  targetNumber: number;
  startNumber: number;
  loopRounds: number;
  animate: boolean;
  delayMs?: number;
  durationMs?: number;
};

function buildTrack(loopRounds: number) {
  return Array.from({ length: loopRounds * 10 }, (_, index) => index % 10);
}

/** 단일 자릿수 — 창문 + 레일. 시작·목표·루프 횟수에 따라 이동 거리가 달라짐 */
function Digit({
  targetNumber,
  startNumber,
  loopRounds,
  animate,
  delayMs = 0,
  durationMs = BASE_TRACK_TRANSITION_MS,
}: DigitProps) {
  const startIndex = (loopRounds - 2) * 10 + startNumber;
  const targetIndex = (loopRounds - 1) * 10 + targetNumber;

  const [offsetIndex, setOffsetIndex] = useState(animate ? startIndex : targetIndex);

  const trackNumbers = useMemo(() => buildTrack(loopRounds), [loopRounds]);

  useEffect(() => {
    if (!animate) {
      setOffsetIndex(targetIndex);
      return;
    }

    setOffsetIndex(startIndex);
    const timer = window.setTimeout(() => {
      setOffsetIndex(targetIndex);
    }, DIGIT_ANIMATION_START_MS + delayMs);

    return () => window.clearTimeout(timer);
  }, [animate, delayMs, startIndex, targetIndex, targetNumber]);

  return (
    <span className="inline-block h-[1lh] overflow-hidden" aria-hidden>
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(calc(-${offsetIndex} * 1lh))`,
          transition: animate
            ? `transform ${durationMs}ms ${TRACK_EASING}`
            : 'none',
        }}
      >
        {trackNumbers.map((num, index) => (
          <span key={index} className="flex h-[1lh] items-center justify-center">
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}

type ParsedDigit = {
  kind: 'digit';
  value: number;
  digitIndex: number;
  totalDigits: number;
};

type ParsedSeparator = {
  kind: 'sep';
  char: string;
};

type ParsedChar = ParsedDigit | ParsedSeparator;

function parseValue(value: number): ParsedChar[] {
  const characters = Math.max(0, Math.round(value)).toLocaleString().split('');
  const totalDigits = characters.filter((char) => char >= '0' && char <= '9').length;
  let digitIndex = 0;

  return characters.map((char) => {
    if (char >= '0' && char <= '9') {
      const parsed: ParsedDigit = {
        kind: 'digit',
        value: Number(char),
        digitIndex,
        totalDigits,
      };
      digitIndex += 1;
      return parsed;
    }
    return { kind: 'sep', char };
  });
}

function extractDigits(value: number, totalDigits: number) {
  const digits = Math.max(0, Math.round(value))
    .toLocaleString()
    .replace(/\D/g, '')
    .split('')
    .map(Number);

  const padded = digits.slice(-totalDigits);
  while (padded.length < totalDigits) {
    padded.unshift(0);
  }
  return padded;
}

function resolveStartDigit(
  targetNumber: number,
  fromValue: number | undefined,
  digitIndex: number,
  totalDigits: number,
  isFirstPlay: boolean,
) {
  if (isFirstPlay) {
    return 0;
  }

  const fromDigits = fromValue == null ? [] : extractDigits(fromValue, totalDigits);
  const fromDigit = fromDigits[digitIndex] ?? 0;

  if (fromDigit === targetNumber) {
    return (targetNumber + 7) % 10;
  }

  return fromDigit;
}

function resolveLoopRounds(digitIndex: number, totalDigits: number) {
  const positionFromRight = totalDigits - 1 - digitIndex;
  return Math.min(MAX_LOOP_ROUNDS, MIN_LOOP_ROUNDS + Math.floor(positionFromRight / 2));
}

function resolveDuration(loopRounds: number) {
  return BASE_TRACK_TRANSITION_MS + (loopRounds - MIN_LOOP_ROUNDS) * 120;
}

type RollingNumberProps = {
  value: number;
  /** 1 이상이면 롤링 재생 (첫 로드 포함) */
  trigger: number;
  delayMs?: number;
  suffix?: string;
};

/**
 * 숫자를 자릿수·콤마로 분해해 Digit 롤링으로 표시.
 * - 왼쪽부터 순차 등장해 전체 너비가 점점 늘어남
 * - 자릿수마다 루프·시작 숫자·재생 시간이 달라짐
 * - 이전 값이 있으면 해당 자릿수에서 이어서 굴림
 */
export function RollingNumber({
  value,
  trigger,
  delayMs = 0,
  suffix,
}: RollingNumberProps) {
  const animate = trigger > 0;
  const parsed = useMemo(() => parseValue(value), [value]);
  const prevValueRef = useRef<number | undefined>(undefined);
  const fromValue = trigger > 1 ? prevValueRef.current : undefined;
  const isFirstPlay = trigger <= 1;

  const [revealCount, setRevealCount] = useState(() =>
    animate ? 0 : parsed.length,
  );

  useEffect(() => {
    if (!animate) {
      setRevealCount(parsed.length);
      prevValueRef.current = value;
      return;
    }

    setRevealCount(0);
    let step = 0;

    const intervalId = window.setInterval(() => {
      step += 1;
      setRevealCount(step);
      if (step >= parsed.length) {
        window.clearInterval(intervalId);
      }
    }, CHAR_REVEAL_MS);

    const maxLoopRounds = parsed.reduce((max, item) => {
      if (item.kind !== 'digit') {
        return max;
      }
      return Math.max(max, resolveLoopRounds(item.digitIndex, item.totalDigits));
    }, MIN_LOOP_ROUNDS);

    const settleMs =
      CHAR_REVEAL_MS * parsed.length +
      delayMs +
      DIGIT_ANIMATION_START_MS +
      resolveDuration(maxLoopRounds);

    const settleTimer = window.setTimeout(() => {
      prevValueRef.current = value;
    }, settleMs);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(settleTimer);
    };
  }, [animate, delayMs, parsed, trigger, value]);

  const visibleChars = parsed.slice(0, revealCount);

  return (
    <span
      className="inline-flex items-center tabular-nums"
      aria-label={
        suffix
          ? `${Math.round(value).toLocaleString()} ${suffix}`
          : Math.round(value).toLocaleString()
      }
    >
      {visibleChars.map((item, index) => {
        if (item.kind === 'sep') {
          return (
            <span key={`sep-${trigger}-${index}`} className="inline-flex h-[1lh] items-center">
              {item.char}
            </span>
          );
        }

        const loopRounds = resolveLoopRounds(item.digitIndex, item.totalDigits);
        const startNumber = resolveStartDigit(
          item.value,
          fromValue,
          item.digitIndex,
          item.totalDigits,
          isFirstPlay,
        );
        const digitDuration = resolveDuration(loopRounds);
        const digitDelay =
          delayMs + item.digitIndex * (CHAR_REVEAL_MS * 0.45 + 20);

        return (
          <Digit
            key={`digit-${trigger}-${index}-${item.value}`}
            targetNumber={item.value}
            startNumber={startNumber}
            loopRounds={loopRounds}
            animate={animate}
            delayMs={digitDelay}
            durationMs={digitDuration}
          />
        );
      })}
      {suffix && revealCount >= parsed.length ? (
        <span className="ml-1 inline-flex h-[1lh] items-center">{suffix}</span>
      ) : null}
    </span>
  );
}
