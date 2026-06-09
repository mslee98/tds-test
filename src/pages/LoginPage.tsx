import { useFunnel } from '@use-funnel/browser';
import { LoginCompleteStep } from '../features/auth/steps/login/CompleteStep';
import { LoginPasswordInputStep } from '../features/auth/steps/login/PasswordInputStep';
import { LoginPhoneInputStep } from '../features/auth/steps/login/PhoneInputStep';
import type { LoginFunnelSteps } from '../features/auth/types/loginFunnel';
import { navigateToPage } from '../utils/navigateToPage';

export function LoginPage() {
  const funnel = useFunnel<LoginFunnelSteps>({
    id: 'login-funnel',
    initial: {
      step: 'PhoneInput',
      context: {},
    },
  });

  const handleBackToHome = () => navigateToPage();

  return (
    <funnel.Render
      PhoneInput={({ history, context, index }) => (
        <LoginPhoneInputStep
          defaultPhone={context.phone}
          onBack={index === 0 ? handleBackToHome : () => history.back()}
          onNext={(phone) => history.push('PasswordInput', { phone })}
        />
      )}
      PasswordInput={({ history, context }) => (
        <LoginPasswordInputStep
          phone={context.phone}
          defaultPassword={context.password}
          onBack={() => history.back()}
          onNext={() =>
            history.push('Complete', {
              phone: context.phone,
            })
          }
        />
      )}
      Complete={() => <LoginCompleteStep />}
    />
  );
}
