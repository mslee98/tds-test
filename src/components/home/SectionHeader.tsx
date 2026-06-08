import { Text, TextButton } from '@toss/tds-mobile';
import { colors } from '@toss/tds-colors';

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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text typography="st7" fontWeight="bold">
        {title}
      </Text>

      {actionLabel && (
        <TextButton
          size="small"
          color={colors.grey500}
          onClick={onActionClick}
        >
          {actionLabel}
        </TextButton>
      )}
    </div>
  );
}
