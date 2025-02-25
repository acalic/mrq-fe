import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { formatPrice } from '@/lib';
import upArrow from '@/assets/up.png';
import downArrow from '@/assets/down.png';
import { useEffect, useState } from 'react';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  clickedCard: string | null;
};

const SymbolCard = ({ id, onClick, price, clickedCard }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceChangeClass, setPriceChangeClass] = useState<string>('');

  useEffect(() => {
    if (previousPrice !== null) {
      if (price > previousPrice) {
        setPriceChangeClass('symbolCard--glow-green');
      } else if (price < previousPrice) {
        setPriceChangeClass('symbolCard--glow-red');
      }

      if (Math.abs(price - previousPrice) / previousPrice >= 0.25) {
        setPriceChangeClass('symbolCard--shake');
      }

      const timeout = setTimeout(() => {
        setPriceChangeClass('');
      }, 1000);

      return () => clearTimeout(timeout);
    }

    setPreviousPrice(price);
  }, [price, previousPrice]);


  const handleOnClick = () => {
    onClick(id);
  };

  const trendIcon = trend === 'UP' ? upArrow : trend === 'DOWN' ? downArrow : null;

  return (
    <div 
      onClick={handleOnClick}
      className={`symbolCard ${clickedCard === id ? 'symbolCard--clicked' : clickedCard ? 'symbolCard--not-clicked' : ''} ${priceChangeClass}`}
    >
      <div className="symbolCard__header">
        <span className="symbolCard__id">{id}</span>
        {trendIcon && <img src={trendIcon} alt={trend || 'no-trend'} className="symbolCard__trend-icon" />}
      </div>
      <div className="symbolCard__price">
        <span className="symbolCard__price-label">Price:</span>
        <span className="symbolCard__price-value">{formatPrice(price) || '--'}</span>
      </div>
      <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
      <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
      <ListItem spacing="space-between" Icon={<MarketCapIcon />} label={formatPrice(marketCap)} />
    </div>
  );
};
export default SymbolCard;
