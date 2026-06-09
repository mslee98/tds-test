import { TextField } from '@toss/tds-mobile';
import { useState } from 'react';
import { FunnelStepLayout } from '../../components/FunnelStepLayout';

const MIN_PASSWORD_LENGTH = 4;

type PasswordInputStepProps = {
  phone: string;
  defaultPassword?: string;
  onBack: () => void;
  onNext: () => void;
};

export function LoginPasswordInputStep({
  phone,
  defaultPassword,
  onBack,
  onNext,
}: PasswordInputStepProps) {
  const [password, setPassword] = useState(defaultPassword ?? '');
  const hasError =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
  const isValid = password.length >= MIN_PASSWORD_LENGTH;

  return (
    <FunnelStepLayout
      title="비밀번호를 입력해주세요"
      subtitle={`${phone} 번호로 로그인해요`}
      onBack={onBack}
      ctaLabel="로그인"
      ctaDisabled={!isValid}
      onCtaClick={onNext}
    >
      <div className="px-6 pt-4">
        <TextField.Password
          variant="line"
          label="비밀번호"
          labelOption="appear"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hasError={hasError}
          help={hasError ? '비밀번호는 4자 이상이어야 해요.' : undefined}
          autoFocus
        />
      </div>
    </FunnelStepLayout>
  );
}
