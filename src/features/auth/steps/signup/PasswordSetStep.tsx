import { TextField } from '@toss/tds-mobile';
import { useCallback, useState } from 'react';
import { SignupAgreementBottomSheet } from '../../components/SignupAgreementSheet';
import { FunnelStepLayout } from '../../components/FunnelStepLayout';
import { useAdvanceOnEnter } from '../../hooks/useAdvanceOnEnter';

const MIN_PASSWORD_LENGTH = 8;

type PasswordSetStepProps = {
  defaultPassword?: string;
  onBack: () => void;
  onNext: () => void;
};

export function PasswordSetStep({
  defaultPassword,
  onBack,
  onNext,
}: PasswordSetStepProps) {
  const [password, setPassword] = useState(defaultPassword ?? '');
  const [agreementOpen, setAgreementOpen] = useState(false);
  const hasError =
    password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
  const isValid = password.length >= MIN_PASSWORD_LENGTH;

  const openAgreementSheet = useCallback(() => {
    if (!isValid) {
      return;
    }
    setAgreementOpen(true);
  }, [isValid]);

  const handleKeyboardAdvance = useAdvanceOnEnter(isValid, openAgreementSheet, {
    advanceOnTab: true,
  });

  return (
    <>
      <FunnelStepLayout
        title="비밀번호를 설정해주세요"
        subtitle="8자 이상으로 설정해주세요"
        onBack={onBack}
        ctaLabel="가입하기"
        ctaDisabled={!isValid}
        onCtaClick={openAgreementSheet}
        submitOnEnter
      >
        <div className="px-6 pt-4">
          <TextField.Password
            variant="line"
            label="비밀번호"
            labelOption="appear"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyboardAdvance}
            hasError={hasError}
            help={
              hasError ? '비밀번호는 8자 이상이어야 해요.' : undefined
            }
            autoFocus
          />
        </div>
      </FunnelStepLayout>

      <SignupAgreementBottomSheet
        open={agreementOpen}
        onClose={() => setAgreementOpen(false)}
        onConfirm={onNext}
      />
    </>
  );
}
