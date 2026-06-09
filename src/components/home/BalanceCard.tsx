import { colors } from '@toss/tds-colors';
import {
  Asset,
  Border,
  IconButton,
  ListHeader,
  ListRow,
  Text,
} from '@toss/tds-mobile';
import { useCallback, useEffect, useState } from 'react';
import { balanceData } from '../../mocks/homeMock';
import { AnimatedCoinAmount } from './AnimatedCoinAmount';
import { AssetButton } from './homeAssets';
import { HomeCard } from './HomeCard';

const COIN_UNIT = 'Coin';

type QuickActionProps = {
  label: string;
  iconName: string;
};

function QuickAction({ label, iconName }: QuickActionProps) {
  return (
    <AssetButton aria-label={label}>
      <div className="flex flex-col items-center gap-2">
        <Asset.Icon
          name={iconName}
          frameShape={Asset.frameShape.CircleLarge}
          backgroundColor={colors.blue500}
          color={colors.background}
        />
        <Text typography="st12" fontWeight="bold" color={colors.grey800}>
          {label}
        </Text>
      </div>
    </AssetButton>
  );
}

type BalanceCardProps = {
  /** 새로고침 시 증가 — 잔액 카운트업 재생 */
  balanceRefreshTrigger?: number;
};

export function BalanceCard({ balanceRefreshTrigger = 0 }: BalanceCardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [animTrigger, setAnimTrigger] = useState(1);

  const playBalanceAnimation = useCallback(() => {
    setAnimTrigger((prev) => prev + 1);
  }, []);

  const handleToggleVisibility = () => {
    setBalanceVisible((prev) => {
      if (!prev) {
        playBalanceAnimation();
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (balanceRefreshTrigger > 0 && balanceVisible) {
      playBalanceAnimation();
    }
  }, [balanceRefreshTrigger, balanceVisible, playBalanceAnimation]);

  return (
    <HomeCard className="px-0 py-0">
      <div className="px-5 pt-5">
        <ListHeader
          title={
            <ListHeader.TitleParagraph fontWeight="bold" typography="t5">
              내 {COIN_UNIT}
            </ListHeader.TitleParagraph>
          }
          description={
            <ListHeader.DescriptionParagraph typography="t7" color={colors.grey500}>
              Coin 계좌
            </ListHeader.DescriptionParagraph>
          }
          right={
            <div className="flex items-center gap-1">
              <IconButton
                name={balanceVisible ? 'icon-eye-on-mono' : 'icon-eye-off-mono'}
                variant="clear"
                color={colors.grey400}
                iconSize={20}
                aria-label={balanceVisible ? '잔액 숨기기' : '잔액 보기'}
                onClick={handleToggleVisibility}
              />
              <ListHeader.RightArrow typography="t6" color={colors.grey600}>
                계좌
              </ListHeader.RightArrow>
            </div>
          }
        />
      </div>

      <div className="flex items-end gap-1.5 px-5 pb-1">
        <AnimatedCoinAmount
          value={balanceData.total}
          visible={balanceVisible}
          trigger={animTrigger}
          typography="t2"
          fontWeight="bold"
          color={colors.grey900}
        />
        {balanceVisible ? (
          <Text
            typography="st10"
            fontWeight="semibold"
            color={colors.grey600}
            className="mb-1 tabular-nums"
          >
            {COIN_UNIT}
          </Text>
        ) : null}
      </div>

      <ListRow
        left={
          <Asset.Icon
            name="icon-circle-mono"
            color={colors.blue500}
            frameShape={Asset.frameShape.CircleXSmall}
          />
        }
        contents={
          <ListRow.Texts type="1RowTypeA" top="사용 가능" topProps={{ color: colors.grey600 }} />
        }
        right={
          <ListRow.Texts
            type="Right1RowTypeE"
            top={
              <AnimatedCoinAmount
                value={balanceData.available}
                visible={balanceVisible}
                trigger={animTrigger}
                delayMs={60}
                suffix={COIN_UNIT}
                typography="st10"
                fontWeight="semibold"
                color={colors.grey900}
              />
            }
            marginTop={0}
          />
        }
        verticalPadding="small"
      />

      <ListRow
        left={
          <Asset.Icon
            name="icon-circle-mono"
            color={colors.grey400}
            frameShape={Asset.frameShape.CircleXSmall}
          />
        }
        contents={
          <ListRow.Texts
            type="1RowTypeA"
            top={
              <span className="inline-flex items-center gap-1">
                거래 중
                <Asset.Icon
                  name="icon-info-circle-mono"
                  color={colors.grey400}
                  frameShape={Asset.frameShape.CircleXSmall}
                />
              </span>
            }
            topProps={{ color: colors.grey600 }}
          />
        }
        right={
          <ListRow.Texts
            type="Right1RowTypeE"
            top={
              <AnimatedCoinAmount
                value={balanceData.inTrade}
                visible={balanceVisible}
                trigger={animTrigger}
                delayMs={120}
                suffix={COIN_UNIT}
                typography="st10"
                fontWeight="semibold"
                color={colors.grey900}
              />
            }
            marginTop={0}
          />
        }
        verticalPadding="small"
      />

      <div className="px-5 pb-5">
        <Border variant="padding24" />

        <div className="grid grid-cols-3 gap-2 pt-4">
          <QuickAction label="충전하기" iconName="icon-plus-mono" />
          <QuickAction label="보내기" iconName="icon-arrow-right-up-mono" />
          <QuickAction label="사용하기" iconName="icon-shopping-bag-mono" />
        </div>
      </div>
    </HomeCard>
  );
}
