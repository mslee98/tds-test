import { colors } from '@toss/tds-colors';
import { IconButton } from '@toss/tds-mobile';
import { FRAME_CONTENT_GUTTER_CLASS } from '../../layout/frame';
import { HomeTopIcon } from './homeAssets';

export function HomeHeader() {
  return (
    <div
      className={`flex items-center justify-between pb-3 pt-3 ${FRAME_CONTENT_GUTTER_CLASS}`}
    >
      <HomeTopIcon />
      <div className="flex items-center gap-6">
        <IconButton
          name="icon-chat-bubble-mono"
          variant="clear"
          color={colors.grey500}
          iconSize={32}
          aria-label="상담"
        />
        <IconButton
          name="icon-alarm-mono"
          variant="clear"
          color={colors.grey500}
          iconSize={32}
          aria-label="알림"
        />
      </div>
    </div>
  );
}
