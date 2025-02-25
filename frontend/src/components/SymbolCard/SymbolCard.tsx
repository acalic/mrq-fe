import './symbolCard.css';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import ListItem from '@/components/ListItem';
import CardHeader from './src/CardHeader';
import PriceDisplay from './src/PriceDisplay';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  clickedCard: string | null;
};

const SymbolCard = ({ id, onClick, price, clickedCard }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceChangeClass, setPriceChangeClass] = useState<string>('');

  useEffect(() => {
    // Only proceed if we have a price and either no previous price or a different price
    if (price && (!previousPrice || price !== previousPrice)) {
      if (previousPrice) {
        let newClass = '';

        if (Math.abs(price - previousPrice) / previousPrice >= 0.25) {
          newClass = 'symbolCard--shake';
        } else if (price > previousPrice) {
          newClass = 'symbolCard--glow-green';
        } else if (price < previousPrice) {
          newClass = 'symbolCard--glow-red';
        }

        setPriceChangeClass(newClass);

        // Reset the class after animation
        const timeout = setTimeout(() => {
          setPriceChangeClass('');
        }, 1000);

        return () => clearTimeout(timeout);
      }

      // Update previous price after effects are applied
      setPreviousPrice(price);
    }
  }, [price]);

  const handleOnClick = () => onClick(id);

  return (
    <div
      onClick={handleOnClick}
      className={`symbolCard ${clickedCard === id ? 'symbolCard--clicked' : clickedCard ? 'symbolCard--not-clicked' : ''} ${priceChangeClass}`}
    >
      <CardHeader id={id} trend={trend} />
      <PriceDisplay price={price} />
      {showCardInfo && (
        <>
          <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
          <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
          <ListItem spacing="space-between" Icon={<MarketCapIcon />} label={formatPrice(marketCap)} />
        </>
      )}
    </div>
  );
};

export default SymbolCard;