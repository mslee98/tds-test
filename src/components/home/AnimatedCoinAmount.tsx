import { Text } from '@toss/tds-mobile';
import type { ComponentProps } from 'react';
import { RollingNumber } from './RollingNumber';

type TextProps = ComponentProps<typeof Text>;

type AnimatedCoinAmountProps = {
  value: number;
  visible: boolean;
  trigger: number;
  delayMs?: number;
  mask?: string;
  suffix?: string;
} & Pick<TextProps, 'typography' | 'fontWeight' | 'color' | 'className'>;

export function AnimatedCoinAmount({
  value,
  visible,
  trigger,
  delayMs = 0,
  mask = '••••••',
  suffix,
  typography,
  fontWeight,
  color,
  className,
}: AnimatedCoinAmountProps) {
  if (!visible) {
    return (
      <Text
        typography={typography}
        fontWeight={fontWeight}
        color={color}
        className={`tabular-nums${className ? ` ${className}` : ''}`}
      >
        {mask}
      </Text>
    );
  }

  return (
    <Text
      typography={typography}
      fontWeight={fontWeight}
      color={color}
      className={`tabular-nums${className ? ` ${className}` : ''}`}
    >
      <RollingNumber
        value={value}
        trigger={trigger}
        delayMs={delayMs}
        suffix={suffix}
      />
    </Text>
  );
}
