import { AuthCompleteScreen } from '../../components/AuthCompleteScreen';
import { navigateToPage } from '../../../../utils/navigateToPage';

export function LoginCompleteStep() {
  return (
    <AuthCompleteScreen
      subtitle="로그인 완료!"
      onCtaClick={() => navigateToPage()}
    />
  );
}
