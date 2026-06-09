import { FixedBottomCTA, Top } from '@toss/tds-mobile';
import type { FormEvent, ReactNode } from 'react';
import { FunnelHeader } from './FunnelHeader';

type FunnelStepLayoutProps = {
  title: string;
  subtitle?: string;
  onBack: () => void;
  children: ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaDisabled?: boolean;
  hideCta?: boolean;
  bottomAccessory?: ReactNode;
  /** true면 form submit(Enter)으로도 onCtaClick 호출 */
  submitOnEnter?: boolean;
};

const CTA_RESERVED_HEIGHT = 80;

export function FunnelStepLayout({
  title,
  subtitle,
  onBack,
  children,
  ctaLabel,
  onCtaClick,
  ctaDisabled = false,
  hideCta = false,
  bottomAccessory,
  submitOnEnter = false,
}: FunnelStepLayoutProps) {
  const showCta = !hideCta && ctaLabel != null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!ctaDisabled && onCtaClick) {
      onCtaClick();
    }
  };

  const content = (
    <>
      <FunnelHeader onBack={onBack} />

      <Top
        title={<Top.TitleParagraph>{title}</Top.TitleParagraph>}
        subtitleBottom={
          subtitle ? (
            <Top.SubtitleParagraph>{subtitle}</Top.SubtitleParagraph>
          ) : undefined
        }
      />

      <main
        className="scrollbar-hidden flex-1 overflow-y-auto"
        style={{ paddingBottom: showCta ? CTA_RESERVED_HEIGHT : 0 }}
      >
        {children}
      </main>
    </>
  );

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {submitOnEnter ? (
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          {content}
        </form>
      ) : (
        content
      )}

      {showCta && (
        <FixedBottomCTA
          onClick={ctaDisabled ? undefined : onCtaClick}
          bottomAccessory={bottomAccessory}
        >
          {ctaLabel}
        </FixedBottomCTA>
      )}
    </div>
  );
}
