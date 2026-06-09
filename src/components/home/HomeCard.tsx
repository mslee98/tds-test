import type { CSSProperties, ReactNode } from 'react';

type HomeCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/** 토스 홈 화면 스타일 — grey100 위 흰 카드 */
export function HomeCard({ children, className, style }: HomeCardProps) {
  return (
    <section
      className={`rounded-[24px] bg-background px-5 py-5${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </section>
  );
}
