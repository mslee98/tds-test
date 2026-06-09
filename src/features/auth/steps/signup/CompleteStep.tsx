import { AuthCompleteScreen } from '../../components/AuthCompleteScreen';
import { navigateToPage } from '../../../../utils/navigateToPage';

type CompleteStepProps = {
  name: string;
};

export function CompleteStep({ name }: CompleteStepProps) {
  return (
    <AuthCompleteScreen
      subtitle="가입 완료!"
      name={name}
      onCtaClick={() => navigateToPage()}
    />
  );
}
