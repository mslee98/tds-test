import { colors } from '@toss/tds-colors';
import { Asset, Text } from '@toss/tds-mobile';
import { partners } from '../../mocks/homeMock';
import { HomeCard } from './HomeCard';
import { HomeMediaAsset } from './homeAssets';
import { SectionHeader } from './SectionHeader';

export function PartnerCard() {
  return (
    <HomeCard>
      <SectionHeader title="MS코인 사용처" actionLabel="전체보기" />

      <div className="mt-3 grid grid-cols-4 gap-3">
        {partners.map((partner) => (
          <button
            key={partner.id}
            type="button"
            className="flex cursor-pointer flex-col items-center gap-2 border-none bg-transparent p-0"
          >
            <HomeMediaAsset
              imageSrc={partner.imageSrc}
              iconName={partner.iconName}
              iconColor={partner.iconColor}
              iconBg={partner.iconBg}
              label={partner.name}
              frameShape={Asset.frameShape.SquircleMedium}
              scale={0.48}
            />
            <Text
              typography="st12"
              fontWeight="bold"
              color={colors.grey800}
              className="text-center"
            >
              {partner.name}
            </Text>
          </button>
        ))}
      </div>
    </HomeCard>
  );
}
