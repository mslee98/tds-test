import {
  BottomSheet,
  ListRow,
  SplitTextField,
  TextButton,
  TextField,
  useBottomSheet,
  useDialog,
} from '@toss/tds-mobile';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CARRIERS } from '../../constants/carriers';
import { FunnelStepLayout } from '../../components/FunnelStepLayout';
import { useAdvanceOnEnter } from '../../hooks/useAdvanceOnEnter';
import type { PersonalInfoPhase } from '../../types/signupFunnel';

type PersonalInfoData = {
  name: string;
  rrnFront: string;
  rrnBack: string;
  carrier: string;
  phone: string;
};

type PersonalInfoStackStepProps = {
  defaultName?: string;
  defaultRrnFront?: string;
  defaultRrnBack?: string;
  defaultCarrier?: string;
  defaultPhone?: string;
  defaultPhase?: PersonalInfoPhase;
  onBack: () => void;
  onComplete: (data: PersonalInfoData) => void;
};

const PHASE_TITLES: Record<PersonalInfoPhase, string> = {
  name: '이름을 알려주세요',
  rrn: '주민등록번호를 입력해주세요',
  carrier: '지금 쓰는 휴대폰은 통신사가 어디인가요?',
  phone: '휴대폰 번호를 알려주세요',
};

function normalizeDigits(value: string, maxLength: number) {
  return value.replace(/\D/g, '').slice(0, maxLength);
}

function normalizePhone(value: string) {
  return value.replace(/\D/g, '');
}

function inferPhase(defaults: {
  name?: string;
  rrnFront?: string;
  rrnBack?: string;
  carrier?: string;
  phone?: string;
  phase?: PersonalInfoPhase;
}): PersonalInfoPhase {
  if (defaults.phase) {
    return defaults.phase;
  }
  if (!defaults.name?.trim()) {
    return 'name';
  }
  if (defaults.rrnFront?.length !== 6 || defaults.rrnBack?.length !== 7) {
    return 'rrn';
  }
  if (!defaults.carrier) {
    return 'carrier';
  }
  return 'phone';
}

const PHASE_ORDER: PersonalInfoPhase[] = ['name', 'rrn', 'carrier', 'phone'];

function previousPhase(phase: PersonalInfoPhase): PersonalInfoPhase | null {
  const index = PHASE_ORDER.indexOf(phase);
  return index > 0 ? PHASE_ORDER[index - 1] : null;
}

export function PersonalInfoStackStep({
  defaultName,
  defaultRrnFront,
  defaultRrnBack,
  defaultCarrier,
  defaultPhone,
  defaultPhase,
  onBack,
  onComplete,
}: PersonalInfoStackStepProps) {
  const [phase, setPhase] = useState<PersonalInfoPhase>(() =>
    inferPhase({
      name: defaultName,
      rrnFront: defaultRrnFront,
      rrnBack: defaultRrnBack,
      carrier: defaultCarrier,
      phone: defaultPhone,
      phase: defaultPhase,
    }),
  );
  const [name, setName] = useState(defaultName ?? '');
  const [rrnFront, setRrnFront] = useState(defaultRrnFront ?? '');
  const [rrnBack, setRrnBack] = useState(defaultRrnBack ?? '');
  const [carrier, setCarrier] = useState(defaultCarrier ?? '');
  const [phone, setPhone] = useState(defaultPhone ?? '');

  const bottomSheet = useBottomSheet();
  const dialog = useDialog();
  const carrierSheetOpenedRef = useRef(false);

  const trimmedName = name.trim();
  const normalizedPhone = normalizePhone(phone);
  const isNameValid = trimmedName.length > 0;
  const isRrnValid = rrnFront.length === 6 && rrnBack.length === 7;
  const isPhoneValid =
    normalizedPhone.length >= 10 && normalizedPhone.length <= 11;

  const advanceToRrn = useCallback(() => setPhase('rrn'), []);

  const openCarrierSheet = useCallback(() => {
    bottomSheet.open({
      onClose: bottomSheet.close,
      header: <BottomSheet.Header>통신사 선택</BottomSheet.Header>,
      children: (
        <>
          {CARRIERS.map((item) => (
            <ListRow
              key={item}
              contents={<ListRow.Texts type="1RowTypeA" top={item} />}
              onClick={() => {
                setCarrier(item);
                bottomSheet.close();
                setPhase('phone');
              }}
            />
          ))}
        </>
      ),
    });
  }, [bottomSheet]);

  const advanceToCarrier = useCallback(() => {
    setPhase('carrier');
    carrierSheetOpenedRef.current = true;
    openCarrierSheet();
  }, [openCarrierSheet]);

  const finishPersonalInfo = useCallback(
    () =>
      onComplete({
        name: trimmedName,
        rrnFront,
        rrnBack,
        carrier,
        phone: normalizedPhone,
      }),
    [carrier, normalizedPhone, onComplete, rrnBack, rrnFront, trimmedName],
  );

  const handleNameKeyboard = useAdvanceOnEnter(isNameValid, advanceToRrn, {
    advanceOnTab: true,
  });
  const handleRrnKeyboard = useAdvanceOnEnter(isRrnValid, advanceToCarrier, {
    advanceOnTab: true,
  });
  const handlePhoneKeyboard = useAdvanceOnEnter(isPhoneValid, finishPersonalInfo, {
    advanceOnTab: true,
  });

  // 뒤로가기 등으로 통신사 단계에 진입했을 때 시트 자동 오픈
  useEffect(() => {
    if (phase !== 'carrier') {
      carrierSheetOpenedRef.current = false;
      return;
    }

    if (!carrier && !carrierSheetOpenedRef.current) {
      carrierSheetOpenedRef.current = true;
      openCarrierSheet();
    }
  }, [carrier, openCarrierSheet, phase]);

  const handleBack = () => {
    const prev = previousPhase(phase);
    if (prev) {
      setPhase(prev);
      return;
    }
    onBack();
  };

  const handleNotMyPhone = async () => {
    await dialog.openAlert({
      title: '본인 명의 휴대폰이 필요해요',
      description:
        '본인 인증은 본인 명의 휴대폰으로만 진행할 수 있어요. 다른 방법이 필요하면 고객센터로 문의해주세요.',
    });
  };

  const showNameBelow = phase !== 'name';
  const showRrnBelow = phase === 'carrier' || phase === 'phone';
  const showCarrierBelow = phase === 'phone';

  const ctaConfig = (() => {
    switch (phase) {
      case 'name':
        return {
          label: '확인',
          disabled: !isNameValid,
          onClick: advanceToRrn,
        };
      case 'rrn':
        return {
          label: '확인',
          disabled: !isRrnValid,
          onClick: advanceToCarrier,
        };
      case 'phone':
        return {
          label: '확인',
          disabled: !isPhoneValid,
          onClick: finishPersonalInfo,
        };
      default:
        return null;
    }
  })();

  return (
    <FunnelStepLayout
      title={PHASE_TITLES[phase]}
      onBack={handleBack}
      ctaLabel={ctaConfig?.label}
      ctaDisabled={ctaConfig?.disabled}
      onCtaClick={ctaConfig?.onClick}
      hideCta={phase === 'carrier'}
      submitOnEnter={phase !== 'carrier'}
    >
      <div className="flex flex-col gap-4 px-6 pt-4">
        {phase === 'name' && (
          <TextField
            variant="line"
            label="이름"
            labelOption="appear"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleNameKeyboard}
            autoFocus
          />
        )}

        {phase === 'rrn' && (
          <SplitTextField.RRN13
            variant="line"
            label="주민등록번호"
            labelOption="appear"
            mask
            focused
            first={{
              value: rrnFront,
              onChange: (e) => setRrnFront(normalizeDigits(e.target.value, 6)),
              autoFocus: true,
              inputMode: 'numeric',
            }}
            second={{
              value: rrnBack,
              onChange: (e) => setRrnBack(normalizeDigits(e.target.value, 7)),
              onKeyDown: handleRrnKeyboard,
              inputMode: 'numeric',
            }}
          />
        )}

        {phase === 'carrier' && (
          <>
            <TextField.Button
              variant="line"
              label="통신사"
              labelOption="appear"
              placeholder="통신사"
              value={carrier}
              onClick={openCarrierSheet}
            />
            <TextButton size="small" onClick={handleNotMyPhone}>
              내 명의의 휴대폰이 아니라면?
            </TextButton>
          </>
        )}

        {phase === 'phone' && (
          <TextField
            variant="line"
            label="휴대폰 번호"
            labelOption="appear"
            placeholder="01012345678"
            value={phone}
            onChange={(e) => setPhone(normalizePhone(e.target.value))}
            onKeyDown={handlePhoneKeyboard}
            inputMode="numeric"
            autoFocus
          />
        )}

        {showCarrierBelow && (
          <TextField.Button
            variant="line"
            label="통신사"
            labelOption="sustain"
            value={carrier}
            disabled
          />
        )}

        {showRrnBelow && (
          <SplitTextField.RRN13
            variant="line"
            label="주민등록번호"
            labelOption="sustain"
            mask
            first={{ value: rrnFront, disabled: true }}
            second={{ value: rrnBack, disabled: true }}
          />
        )}

        {showNameBelow && (
          <TextField
            variant="line"
            label="이름"
            labelOption="sustain"
            value={trimmedName}
            disabled
          />
        )}
      </div>
    </FunnelStepLayout>
  );
}
