import { colors } from '@toss/tds-colors';
import { Text } from '@toss/tds-mobile';

export function DesktopPromoSidebar() {
  return (
    <div className="h-full pt-[150px]">
      <div className="desktop:fixed desktop:w-[344px]">
        <div
          className="relative flex flex-col gap-8"
          aria-label="앱 다운로드 배너"
        >
          <div className="flex h-[200px] flex-col items-center justify-center gap-3 rounded-[24px] bg-blue-50">
            <Text typography="t3" fontWeight="bold" color={colors.blue500}>
              MS 거래 솔루션
            </Text>
            <Text typography="st11" color={colors.grey600}>
              토스처럼 빠르고 안전한 거래
            </Text>
          </div>

          <div className="flex items-center justify-between">
            <Text
              typography="st10"
              fontWeight="bold"
              color={colors.grey900}
              className="flex-1 whitespace-pre pl-4"
            >
              앱 설치하고{'\n'}더 빠르게 거래하세요
            </Text>

            <div
              aria-label="앱 다운로드 QR 영역"
              className="flex h-[140px] w-[140px] shrink-0 items-center justify-center rounded-2xl border border-grey-200 bg-background"
            >
              <Text typography="st12" color={colors.grey500}>
                QR
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
