import { colors } from '@toss/tds-colors';
import { Button, Text } from '@toss/tds-mobile';
import { useEffect, useState, type CSSProperties } from 'react';
import { RUNTIME_MODE_LABEL, useRuntime } from '../hooks/useRuntime';
import { PageLayout } from '../layout/PageLayout';
import { useInstallPrompt } from '../pwa/useInstallPrompt';
import { useNotificationPermission } from '../pwa/useNotificationPermission';

const bannerStyle: CSSProperties = {
  padding: 12,
  marginTop: 12,
  border: `1px solid ${colors.grey200}`,
  borderRadius: 12,
  background: colors.grey50,
};

export function DevToolsPage() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const { canInstall, install } = useInstallPrompt();
  const { mode, isStandalone } = useRuntime();
  const { permission, requestPermission, showTestNotification } =
    useNotificationPermission();

  useEffect(() => {
    const handleNeedRefresh = () => setNeedRefresh(true);
    const handleOfflineReady = () => setOfflineReady(true);

    window.addEventListener('pwa:need-refresh', handleNeedRefresh);
    window.addEventListener('pwa:offline-ready', handleOfflineReady);

    return () => {
      window.removeEventListener('pwa:need-refresh', handleNeedRefresh);
      window.removeEventListener('pwa:offline-ready', handleOfflineReady);
    };
  }, []);

  return (
    <PageLayout
      title="MS 거래 솔루션"
      subtitle="React PWA + TDS Mobile 세팅 테스트 화면입니다."
      hideCta
    >
      <div style={{ padding: '0 20px 20px' }}>
        <section>
          <Text typography="t3" fontWeight="semibold">
            실행 환경
          </Text>
          <Text typography="t5" style={{ marginTop: 8 }}>
            실행 모드: {RUNTIME_MODE_LABEL[mode]}
          </Text>
        </section>

        <section style={{ marginTop: 24 }}>
          <Text typography="t3" fontWeight="semibold">
            PWA 상태
          </Text>
          <Text typography="t5" style={{ marginTop: 8 }}>
            standalone: {isStandalone ? '예' : '아니오'}
          </Text>

          {!isStandalone && canInstall && (
            <div style={{ marginTop: 12 }}>
              <Button onClick={install}>앱처럼 설치하기</Button>
            </div>
          )}

          {!isStandalone && !canInstall && (
            <div style={{ marginTop: 12 }}>
              <Text typography="t6">iPhone에서는 Safari 공유 버튼을 누른 뒤</Text>
              <Text typography="t6" fontWeight="bold">
                홈 화면에 추가
              </Text>
              <Text typography="t6">를 선택해서 설치 테스트를 진행하세요.</Text>
            </div>
          )}
        </section>

        <section style={{ marginTop: 24 }}>
          <Text typography="t3" fontWeight="semibold">
            TDS Mobile 컴포넌트
          </Text>
          <div
            style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}
          >
            <Button color="primary" variant="fill">
              거래 시작
            </Button>
            <Button color="dark" variant="weak">
              취소
            </Button>
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <Text typography="t3" fontWeight="semibold">
            알림 테스트
          </Text>
          <Text typography="t5" style={{ marginTop: 8 }}>
            현재 권한: {permission}
          </Text>
          <div
            style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}
          >
            <Button onClick={requestPermission}>알림 권한 요청</Button>
            <Button color="dark" variant="weak" onClick={showTestNotification}>
              테스트 알림 보내기
            </Button>
          </div>
        </section>

        {offlineReady && (
          <div style={bannerStyle}>
            오프라인에서도 기본 화면을 사용할 수 있도록 준비되었습니다.
          </div>
        )}

        {needRefresh && (
          <div style={bannerStyle}>
            새 버전이 있습니다.
            <Button
              size="small"
              style={{ marginLeft: 8 }}
              onClick={() => window.updateServiceWorker?.(true)}
            >
              업데이트
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
