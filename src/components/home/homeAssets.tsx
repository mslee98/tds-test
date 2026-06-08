import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import type { ReactNode } from 'react';

type FramedIconProps = {
  name: string;
  color?: string;
  backgroundColor?: string;
  frameShape?: (typeof Asset.frameShape)[keyof typeof Asset.frameShape];
};

export function FramedIcon({
  name,
  color = colors.grey900,
  backgroundColor,
  frameShape = Asset.frameShape.CircleMedium,
}: FramedIconProps) {
  return (
    <Asset.Icon
      name={name}
      color={color}
      backgroundColor={backgroundColor}
      frameShape={frameShape}
    />
  );
}

type FramedImageProps = {
  src: string;
  alt: string;
  backgroundColor?: string;
  frameShape?: (typeof Asset.frameShape)[keyof typeof Asset.frameShape];
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

export function NotificationCountAcc({ count }: { count: number }) {
  return (
    <Asset.Text
      frameShape={{ width: 20, height: 20, radius: 9999 }}
      backgroundColor={colors.red500}
    >
      <Text typography="st13" fontWeight="bold" color={colors.background}>
        {count}
      </Text>
    </Asset.Text>
  );
}

export function NotificationDotAcc() {
  return (
    <Asset.Text
      frameShape={{ width: 8, height: 8, radius: 9999 }}
      backgroundColor={colors.red500}
    />
  );
}

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
