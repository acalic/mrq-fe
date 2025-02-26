import './symbolsGrid.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  clickedCard: string | null;
};

const SymbolsGrid = ({ onSymbolClick, clickedCard }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {stockSymbols.map((id, i) => (
        <SymbolCard 
          price={prices[id]} 
          onClick={onSymbolClick} 
          key={i} 
          id={id} 
          clickedCard={clickedCard}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
