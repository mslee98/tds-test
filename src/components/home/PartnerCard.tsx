import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { partners } from '../../mocks/homeMock';
import type { Partner } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { FramedImage } from './homeAssets';
import { SectionHeader } from './SectionHeader';

function PartnerAsset({ partner }: { partner: Partner }) {
  if (partner.imageSrc) {
    return (
      <FramedImage
        src={partner.imageSrc}
        alt={partner.name}
        backgroundColor={partner.iconBg}
        frameShape={Asset.frameShape.SquircleMedium}
      />
    );
  }

  return (
    <Asset.Icon
      name={partner.iconName ?? 'icon-apps-grid-mono'}
      frameShape={Asset.frameShape.SquircleMedium}
      backgroundColor={partner.iconBg}
      color={partner.iconColor ?? colors.grey500}
    />
  );
}

export function PartnerCard() {
  return (
    <HomeCard>
      <SectionHeader title="MS코인 사용처" actionLabel="전체보기" />

      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}
      >
        {partners.map((partner) => (
          <button
            key={partner.id}
            type="button"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 102,
              border: `1px solid ${colors.grey100}`,
              borderRadius: 20,
              backgroundColor: colors.grey50,
              cursor: 'pointer',
              padding: '8px 4px',
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <PartnerAsset partner={partner} />
            </div>

            <Text typography="t6" fontWeight="bold">
              {partner.name}
            </Text>
            {partner.description && (
              <Text
                typography="st12"
                color={colors.grey600}
                style={{ marginTop: 2 }}
              >
                {partner.description}
              </Text>
            )}
          </button>
        ))}
      </div>
    </HomeCard>
  );
}
