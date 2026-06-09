import { colors } from '@toss/tds-colors';
import { Text } from '@toss/tds-mobile';
import type { ReactElement } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';

type PullToRefreshContainerProps = {
  onRefresh: () => Promise<void>;
  children: ReactElement;
  className?: string;
};

export function PullToRefreshContainer({
  onRefresh,
  children,
  className = '',
}: PullToRefreshContainerProps) {
  return (
    <PullToRefresh
      onRefresh={onRefresh}
      className={className}
      backgroundColor={colors.grey100}
      pullDownThreshold={72}
      maxPullDownDistance={96}
      pullingContent={
        <div className="flex justify-center py-3">
          <Text typography="t7" color={colors.grey500}>
            아래로 당겨 새로고침
          </Text>
        </div>
      }
      refreshingContent={
        <div className="flex justify-center py-3">
          <Text typography="t7" color={colors.grey600}>
            불러오는 중...
          </Text>
        </div>
      }
    >
      {children}
    </PullToRefresh>
  );
}
