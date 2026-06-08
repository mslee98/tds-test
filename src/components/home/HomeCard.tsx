import { colors } from '@toss/tds-colors';
import type { CSSProperties, ReactNode } from 'react';

type HomeCardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

const cardStyle: CSSProperties = {
  borderRadius: 28,
  backgroundColor: colors.background,
  padding: 24,
  boxShadow: '0 16px 40px rgba(0, 0, 0, 0.04)',
};

export function HomeCard({ children, style }: HomeCardProps) {
  return <section style={{ ...cardStyle, ...style }}>{children}</section>;
}
