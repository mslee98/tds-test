import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import type { ReactNode } from 'react';
import type { HomeMediaAssetData } from './types';

const HOME_LOGO_SRC = '/logo_symbol_gray.png';

type FrameShape = (typeof Asset.frameShape)[keyof typeof Asset.frameShape];

/** 홈 상단 Top 영역 로고 */
export function HomeTopIcon() {
  return (
    <img src={HOME_LOGO_SRC} alt="Nubi" className="h-10 w-auto" />
  );
}

/**
 * TDS Asset.Icon 래퍼
 * @see Asset.Icon — Frame + ContentIcon 조합. frameShape 프리셋으로 크기·모양 통일
 */
type FramedIconProps = {
  name: string;
  color?: string;
  backgroundColor?: string;
  frameShape?: FrameShape;
  acc?: ReactNode;
  accPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
};

export function FramedIcon({
  name,
  color = colors.grey900,
  backgroundColor,
  frameShape = Asset.frameShape.CircleMedium,
  acc,
  accPosition = 'top-right',
}: FramedIconProps) {
  return (
    <Asset.Icon
      name={name}
      color={color}
      backgroundColor={backgroundColor}
      frameShape={frameShape}
      acc={acc}
      accPosition={accPosition}
    />
  );
}

/**
 * TDS Asset.Image 래퍼
 * @see Asset.Image — frameShape + scale로 이미지 맞춤, backgroundColor로 프레임 배경 지정
 */
type FramedImageProps = {
  src: string;
  alt: string;
  backgroundColor?: string;
  frameShape?: FrameShape;
  scale?: number;
};

export function FramedImage({
  src,
  alt,
  backgroundColor = colors.grey100,
  frameShape = Asset.frameShape.SquircleMedium,
  scale = 0.55,
}: FramedImageProps) {
  return (
    <Asset.Image
      src={src}
      alt={alt}
      backgroundColor={backgroundColor}
      frameShape={frameShape}
      scale={scale}
    />
  );
}

/**
 * imageSrc 또는 iconName 중 하나로 Asset.Image / Asset.Icon을 선택 렌더
 */
type HomeMediaAssetProps = HomeMediaAssetData & {
  frameShape: FrameShape;
  scale?: number;
};

export function HomeMediaAsset({
  imageSrc,
  iconName,
  iconColor,
  iconBg,
  label,
  frameShape,
  scale,
}: HomeMediaAssetProps) {
  if (imageSrc) {
    return (
      <FramedImage
        src={imageSrc}
        alt={label}
        backgroundColor={iconBg}
        frameShape={frameShape}
        scale={scale}
      />
    );
  }

  return (
    <FramedIcon
      name={iconName ?? 'icon-plus-mono'}
      frameShape={frameShape}
      backgroundColor={iconBg}
      color={iconColor ?? colors.grey500}
    />
  );
}

/**
 * TDS Asset acc 패턴 — 알림 개수 뱃지
 * @see Asset.Icon의 acc + accPosition으로 부가 정보 표시
 */
type NotificationCountAccProps = {
  count: number;
  /** 헤더 등 작은 아이콘용 */
  compact?: boolean;
};

export function NotificationCountAcc({
  count,
  compact = false,
}: NotificationCountAccProps) {
  const badgeSize = compact ? 14 : 16;

  return (
    <Asset.Text
      frameShape={{ width: badgeSize, height: badgeSize, radius: 9999 }}
      backgroundColor={colors.red500}
    >
      <Text typography="st13" fontWeight="bold" color={colors.background}>
        {count}
      </Text>
    </Asset.Text>
  );
}

/** TDS Asset acc 패턴 — 읽지 않음 점 표시 */
export function NotificationDotAcc() {
  return (
    <Asset.Text
      frameShape={{ width: 8, height: 8, radius: 9999 }}
      backgroundColor={colors.red500}
    />
  );
}

/** Asset은 버튼이 아니므로, 클릭 가능한 영역은 native button으로 감쌈 */
type AssetButtonProps = {
  'aria-label': string;
  onClick?: () => void;
  children: ReactNode;
};

export function AssetButton({
  'aria-label': ariaLabel,
  onClick,
  children,
}: AssetButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {children}
    </button>
  );
}
