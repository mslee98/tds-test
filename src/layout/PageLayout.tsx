import { FixedBottomCTA, Top } from '@toss/tds-mobile';
import type { ReactNode } from 'react';

type PageLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
  hideCta?: boolean;
};

const CTA_RESERVED_HEIGHT = 80;

export function PageLayout({
  title,
  subtitle,
  children,
  ctaLabel,
  onCtaClick,
  hideCta = false,
}: PageLayoutProps) {
  const showCta = !hideCta && ctaLabel != null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
      }}
    >
      <Top
        title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
        subtitleBottom={
          subtitle ? (
            <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph>
          ) : undefined
        }
      />

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: showCta ? CTA_RESERVED_HEIGHT : 0,
        }}
      >
        {children}
      </main>

      {showCta && (
        <FixedBottomCTA onClick={onCtaClick}>{ctaLabel}</FixedBottomCTA>
      )}
    </div>
  );
}
