import React from 'react';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import ListItem from '@/components/ListItem';
import { formatPrice } from '@/lib';

type InfoSectionProps = {
  companyName: string;
  industry: string;
  marketCap: number;
};

const InfoSection = React.memo(({ companyName, industry, marketCap }: InfoSectionProps) => (
  <>
    <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
    <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
    <ListItem spacing="space-between" Icon={<MarketCapIcon />} label={formatPrice(marketCap)} />
  </>
));

InfoSection.displayName = 'InfoSection';

export default InfoSection;