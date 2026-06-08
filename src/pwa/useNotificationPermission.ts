import { useState } from 'react';

export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification === 'undefined'
      ? 'denied'
      : Notification.permission,
  );

  const requestPermission = async () => {
    if (typeof Notification === 'undefined') {
      setPermission('denied');
      return 'denied' as const;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    return result;
  };

  const showTestNotification = () => {
    if (Notification.permission !== 'granted') return;

    new Notification('MS 거래 알림 테스트', {
      body: '입금 확인, 거래 매칭, 정산 완료 알림에 사용할 수 있습니다.',
      icon: '/icons/icon-192.png',
    });
  };

  return {
    permission,
    requestPermission,
    showTestNotification,
  };
}
