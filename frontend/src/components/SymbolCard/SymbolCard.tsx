import './symbolCard.css';
import React, { useCallback } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { usePriceChangeEffect } from '@/hooks/effects/usePriceChangeEffect';

import AnimatedContainer from './src/AnimatedContainer';
import CardHeader from './src/CardHeader';
import PriceDisplay from './src/PriceDisplay';
import InfoSection from './src/InfoSection';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  clickedCard: string | null;
};

const SymbolCard = ({ id, onClick, price, clickedCard }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const priceChangeClass = usePriceChangeEffect(price);

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  const className = `symbolCard ${
    clickedCard === id ? 'symbolCard--clicked' : clickedCard ? 'symbolCard--not-clicked' : ''
  } ${priceChangeClass}`;

  return (
    <AnimatedContainer className={className} onClick={handleOnClick}>
      <CardHeader id={id} trend={trend} />
      <PriceDisplay price={price} />
      {showCardInfo && (
        <InfoSection
          companyName={companyName}
          industry={industry}
          marketCap={marketCap}
        />
      )}
    </AnimatedContainer>
  );
};

SymbolCard.displayName = 'SymbolCard';

export default React.memo(SymbolCard);