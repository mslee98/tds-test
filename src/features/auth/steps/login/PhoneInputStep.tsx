import { TextField } from '@toss/tds-mobile';
import { useState } from 'react';
import { FunnelStepLayout } from '../../components/FunnelStepLayout';

type PhoneInputStepProps = {
  defaultPhone?: string;
  onBack: () => void;
  onNext: (phone: string) => void;
};

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

export function LoginPhoneInputStep({
  defaultPhone,
  onBack,
  onNext,
}: PhoneInputStepProps) {
  const [phone, setPhone] = useState(defaultPhone ?? '');
  const normalizedPhone = normalizePhone(phone);
  const isValid = normalizedPhone.length >= 10 && normalizedPhone.length <= 11;

  return (
    <FunnelStepLayout
      title="휴대폰 번호를 입력해주세요"
      onBack={onBack}
      ctaLabel="다음"
      ctaDisabled={!isValid}
      onCtaClick={() => onNext(normalizedPhone)}
    >
      <div className="px-6 pt-4">
        <TextField
          variant="line"
          label="휴대폰 번호"
          labelOption="appear"
          placeholder="01012345678"
          value={phone}
          onChange={(e) => setPhone(normalizePhone(e.target.value))}
          inputMode="numeric"
          autoFocus
        />
      </div>
    </FunnelStepLayout>
  );
}
