import { colors } from '@toss/tds-colors';
import {
  AgreementV4,
  BottomSheet,
  useToast,
} from '@toss/tds-mobile';
import { useCallback, useEffect, useMemo, useState } from 'react';

type AgreementKey =
  | 'service'
  | 'privacy'
  | 'privacyDetail'
  | 'marketing'
  | 'marketingPush'
  | 'marketingSms';

type AgreementChecks = Record<AgreementKey, boolean>;

const INITIAL_CHECKS: AgreementChecks = {
  service: false,
  privacy: false,
  privacyDetail: false,
  marketing: false,
  marketingPush: false,
  marketingSms: false,
};

const REQUIRED_KEYS: AgreementKey[] = ['service', 'privacy'];

type SignupAgreementFieldsProps = {
  checks: AgreementChecks;
  privacyCollapsed: boolean;
  onPrivacyCollapsedChange: (collapsed: boolean) => void;
  onAllChange: (checked: boolean) => void;
  onCheckChange: (key: AgreementKey, checked: boolean) => void;
  onMarketingChange: (checked: boolean) => void;
  onTermDetail: () => void;
};

function SignupAgreementFields({
  checks,
  privacyCollapsed,
  onPrivacyCollapsedChange,
  onAllChange,
  onCheckChange,
  onMarketingChange,
  onTermDetail,
}: SignupAgreementFieldsProps) {
  const allChecked = useMemo(
    () => (Object.keys(checks) as AgreementKey[]).every((key) => checks[key]),
    [checks],
  );

  return (
    <>
      <AgreementV4
        variant="large"
        left={
          <AgreementV4.Checkbox checked={allChecked} onCheckedChange={onAllChange} />
        }
        middle={<AgreementV4.Text>전체 동의하기</AgreementV4.Text>}
      />

      <AgreementV4.Description variant="normal" indent={1}>
        전체 동의는 필수·선택 항목을 한 번에 동의할 때 사용돼요.
      </AgreementV4.Description>

      <AgreementV4
        variant="large"
        left={<AgreementV4.Checkbox variant="hidden" />}
        middle={
          <AgreementV4.Text
            necessity={
              <AgreementV4.Necessity variant="mandatory">필수</AgreementV4.Necessity>
            }
          >
            Coin 서비스 약관
          </AgreementV4.Text>
        }
      />
      <AgreementV4
        variant="small"
        indent={1}
        left={
          <AgreementV4.Checkbox
            checked={checks.service}
            onCheckedChange={(checked) => onCheckChange('service', checked)}
          />
        }
        middle={
          <AgreementV4.Pressable onPressEnd={onTermDetail}>
            <AgreementV4.Text>서비스 이용약관</AgreementV4.Text>
            <AgreementV4.RightArrow />
          </AgreementV4.Pressable>
        }
      />

      <AgreementV4.Collapsible
        collapsed={privacyCollapsed}
        onCollapsedChange={onPrivacyCollapsedChange}
      >
        <AgreementV4.CollapsibleTrigger>
          <AgreementV4
            variant="small"
            indent={1}
            left={
              <AgreementV4.Checkbox
                checked={checks.privacy}
                onCheckedChange={(checked) => onCheckChange('privacy', checked)}
              />
            }
            middle={
              <AgreementV4.Text onPressEnd={onTermDetail}>
                개인정보 수집·이용 동의
              </AgreementV4.Text>
            }
            right={<AgreementV4.RightArrow collapsed={privacyCollapsed} />}
          />
        </AgreementV4.CollapsibleTrigger>
        <AgreementV4.CollapsibleContent>
          <AgreementV4.Description variant="box" indent={2}>
            수집된 개인정보는 회원 식별, Coin 계좌 운영, 거래 안내 목적으로만
            사용돼요.
          </AgreementV4.Description>
          <AgreementV4
            variant="small"
            indent={2}
            left={
              <AgreementV4.Checkbox
                variant="dot"
                checked={checks.privacyDetail}
                onCheckedChange={(checked) => onCheckChange('privacyDetail', checked)}
              />
            }
            middle={
              <AgreementV4.Text onPressEnd={onTermDetail}>
                고유식별정보 수집·이용
              </AgreementV4.Text>
            }
          />
        </AgreementV4.CollapsibleContent>
      </AgreementV4.Collapsible>

      <AgreementV4
        variant="large"
        left={<AgreementV4.Checkbox variant="hidden" />}
        middle={
          <AgreementV4.Text
            necessity={
              <AgreementV4.Necessity variant="optional">선택</AgreementV4.Necessity>
            }
          >
            <AgreementV4.Description variant="box" indent={2}>
              수집된 개인정보는 회원 식별, Coin 계좌 운영, 거래 안내 목적으로만
              사용돼요.
            </AgreementV4.Description>
            혜택·이벤트 알림
          </AgreementV4.Text>
        }
        right={
          <AgreementV4.Badge variant="clear" textColor={colors.blue500}>
            안심
          </AgreementV4.Badge>
        }
      />
      <AgreementV4.IndentPushable pushed={checks.marketing}>
        <AgreementV4.IndentPushableTrigger>
          <AgreementV4
            variant="small"
            indent={1}
            left={
              <AgreementV4.Checkbox
                checked={checks.marketing}
                onCheckedChange={onMarketingChange}
              />
            }
            middle={<AgreementV4.Text>혜택·이벤트 알림 수신</AgreementV4.Text>}
          />
        </AgreementV4.IndentPushableTrigger>
        <AgreementV4.IndentPushableContent>
          <AgreementV4
            variant="small"
            left={
              <AgreementV4.Checkbox
                variant="dot"
                checked={checks.marketingPush}
                onCheckedChange={(checked) => onCheckChange('marketingPush', checked)}
              />
            }
            middle={<AgreementV4.Text>앱 푸시 알림</AgreementV4.Text>}
          />
          <AgreementV4
            variant="small"
            left={
              <AgreementV4.Checkbox
                variant="dot"
                checked={checks.marketingSms}
                onCheckedChange={(checked) => onCheckChange('marketingSms', checked)}
              />
            }
            middle={<AgreementV4.Text>문자·이메일 알림</AgreementV4.Text>}
          />
        </AgreementV4.IndentPushableContent>
      </AgreementV4.IndentPushable>
    </>
  );
}

type SignupAgreementBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

/** TDS BottomSheet 슬롯(header / headerDescription / children / cta) 구조 */
export function SignupAgreementBottomSheet({
  open,
  onClose,
  onConfirm,
}: SignupAgreementBottomSheetProps) {
  const { openToast } = useToast();
  const [checks, setChecks] = useState<AgreementChecks>(INITIAL_CHECKS);
  const [privacyCollapsed, setPrivacyCollapsed] = useState(true);
  const requiredDone = REQUIRED_KEYS.every((key) => checks[key]);

  useEffect(() => {
    if (!open) {
      setChecks(INITIAL_CHECKS);
      setPrivacyCollapsed(true);
    }
  }, [open]);

  const setCheck = useCallback((key: AgreementKey, checked: boolean) => {
    setChecks((prev) => ({ ...prev, [key]: checked }));
  }, []);

  const handleAllChange = useCallback((checked: boolean) => {
    setChecks({
      service: checked,
      privacy: checked,
      privacyDetail: checked,
      marketing: checked,
      marketingPush: checked,
      marketingSms: checked,
    });
  }, []);

  const handleMarketingChange = useCallback((checked: boolean) => {
    setChecks((prev) => ({
      ...prev,
      marketing: checked,
      marketingPush: checked ? prev.marketingPush : false,
      marketingSms: checked ? prev.marketingSms : false,
    }));
  }, []);

  const showTermDetail = useCallback(() => {
    openToast('약관 상세는 준비 중이에요', { icon: 'icn-attention-color' });
  }, [openToast]);

  const handleConfirm = () => {
    if (!requiredDone) {
      return;
    }
    onConfirm();
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      header={<BottomSheet.Header>약관에 동의해주세요</BottomSheet.Header>}
      headerDescription={
        <BottomSheet.HeaderDescription>
          서비스 이용을 위해 필요해요
        </BottomSheet.HeaderDescription>
      }
      cta={
        <BottomSheet.CTA disabled={!requiredDone} onClick={handleConfirm}>
          동의하고 가입하기
        </BottomSheet.CTA>
      }
    >
      <SignupAgreementFields
        checks={checks}
        privacyCollapsed={privacyCollapsed}
        onPrivacyCollapsedChange={setPrivacyCollapsed}
        onAllChange={handleAllChange}
        onCheckChange={setCheck}
        onMarketingChange={handleMarketingChange}
        onTermDetail={showTermDetail}
      />
    </BottomSheet>
  );
}
