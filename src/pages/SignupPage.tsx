import { useFunnel } from '@use-funnel/browser';
import { CompleteStep } from '../features/auth/steps/signup/CompleteStep';
import { PasswordSetStep } from '../features/auth/steps/signup/PasswordSetStep';
import { PersonalInfoStackStep } from '../features/auth/steps/signup/PersonalInfoStackStep';
import { VerifyCodeStep } from '../features/auth/steps/signup/VerifyCodeStep';
import type { SignupFunnelSteps } from '../features/auth/types/signupFunnel';
import { navigateToPage } from '../utils/navigateToPage';

export function SignupPage() {
  const funnel = useFunnel<SignupFunnelSteps>({
    id: 'signup-funnel',
    initial: {
      step: 'PersonalInfo',
      context: {},
    },
  });

  const handleBackToHome = () => navigateToPage();

  return (
    <funnel.Render
      PersonalInfo={({ history, context, index }) => (
        <PersonalInfoStackStep
          defaultName={context.name}
          defaultRrnFront={context.rrnFront}
          defaultRrnBack={context.rrnBack}
          defaultCarrier={context.carrier}
          defaultPhone={context.phone}
          defaultPhase={context.phase}
          onBack={index === 0 ? handleBackToHome : () => history.back()}
          onComplete={(data) => history.push('VerifyCode', data)}
        />
      )}
      VerifyCode={({ history, context }) => (
        <VerifyCodeStep
          phone={context.phone}
          defaultVerifyCode={context.verifyCode}
          onBack={() =>
            history.push('PersonalInfo', {
              ...context,
              phase: 'phone',
            })
          }
          onNext={() =>
            history.push('PasswordSet', {
              verifyCode: context.verifyCode ?? '123456',
            })
          }
        />
      )}
      PasswordSet={({ history, context }) => (
        <PasswordSetStep
          defaultPassword={context.password}
          onBack={() => history.back()}
          onNext={() =>
            history.push('Complete', {
              name: context.name,
              phone: context.phone,
              password: context.password ?? '',
            })
          }
        />
      )}
      Complete={({ context }) => <CompleteStep name={context.name} />}
    />
  );
}
