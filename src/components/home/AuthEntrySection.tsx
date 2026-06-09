import { colors } from '@toss/tds-colors';
import { Button, Text, TextButton } from '@toss/tds-mobile';
import { navigateToPage } from '../../utils/navigateToPage';
import { HomeCard } from './HomeCard';

export function AuthEntrySection() {
  return (
    <HomeCard className="flex flex-col gap-3">
      <Text typography="t5" fontWeight="semibold" color={colors.grey800}>
        계정
      </Text>
      <Text typography="st10" color={colors.grey600}>
        회원가입 또는 로그인 후 서비스를 이용할 수 있어요.
      </Text>
      <div className="flex gap-2">
        <Button size="medium" onClick={() => navigateToPage('signup')}>
          회원가입
        </Button>
        <TextButton size="medium" onClick={() => navigateToPage('login')}>
          로그인
        </TextButton>
      </div>
    </HomeCard>
  );
}
