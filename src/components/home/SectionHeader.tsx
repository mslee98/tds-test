import { ListHeader } from '@toss/tds-mobile';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function SectionHeader({
  title,
  actionLabel,
  onActionClick,
}: SectionHeaderProps) {
  return (
    <ListHeader
      title={
        <ListHeader.TitleParagraph fontWeight="bold" typography="t5">
          {title}
        </ListHeader.TitleParagraph>
      }
      right={
        actionLabel ? (
          <ListHeader.RightArrow typography="t6" onClick={onActionClick}>
            {actionLabel}
          </ListHeader.RightArrow>
        ) : undefined
      }
    />
  );
}
