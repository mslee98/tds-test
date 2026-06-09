import { colors } from '@toss/tds-colors';
import { IconButton } from '@toss/tds-mobile';

type FunnelHeaderProps = {
  onBack: () => void;
};

export function FunnelHeader({ onBack }: FunnelHeaderProps) {
  return (
    <div className="flex items-center px-2 pb-2 pt-3">
      <IconButton
        name="icon-arrow-left-mono"
        variant="clear"
        color={colors.grey600}
        iconSize={40}
        aria-label="뒤로"
        onClick={onBack}
      />
    </div>
  );
}
