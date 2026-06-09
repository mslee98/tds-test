import { TextField } from '@toss/tds-mobile';
import { useState } from 'react';
import { FunnelStepLayout } from '../../components/FunnelStepLayout';
import { useAdvanceOnEnter } from '../../hooks/useAdvanceOnEnter';

const MOCK_VERIFY_CODE = '123456';

type VerifyCodeStepProps = {
  phone: string;
  defaultVerifyCode?: string;
  onBack: () => void;
  onNext: () => void;
};

export function VerifyCodeStep({
  phone,
  defaultVerifyCode,
  onBack,
  onNext,
}: VerifyCodeStepProps) {
  const [verifyCode, setVerifyCode] = useState(defaultVerifyCode ?? '');
  const hasError =
    verifyCode.length === 6 && verifyCode !== MOCK_VERIFY_CODE;
  const isValid = verifyCode === MOCK_VERIFY_CODE;
  const handleKeyboardAdvance = useAdvanceOnEnter(isValid, onNext, {
    advanceOnTab: true,
  });

  return (
    <FunnelStepLayout
      title="문자로 온 인증번호 6자리를 입력해주세요"
      subtitle={`${phone} 번호로 인증번호를 보냈어요`}
      onBack={onBack}
      ctaLabel="확인"
      ctaDisabled={!isValid}
      onCtaClick={onNext}
      submitOnEnter
    >
      <div className="px-6 pt-4">
        <TextField
          variant="line"
          label="인증번호"
          labelOption="appear"
          placeholder="6자리 숫자"
          value={verifyCode}
          onChange={(e) =>
            setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))
          }
          onKeyDown={handleKeyboardAdvance}
          hasError={hasError}
          help={
            hasError
              ? '인증번호가 올바르지 않아요. 다시 입력해주세요.'
              : '테스트용 인증번호는 123456이에요.'
          }
          inputMode="numeric"
          autoFocus
        />
      </div>
    </FunnelStepLayout>
  );
}
