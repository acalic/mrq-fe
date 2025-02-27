import './symbolsView.css';
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';
import DesktopInfo from './src/DesktopInfo';
import SymbolsGrid from '@/components/SymbolsGrid';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveSymbol, selectActiveSymbol } from '@/store/dashboardOptionsSlice';

// Lazy load PriceChart as it's not needed immediately
const PriceChart = lazy(() => import('@/components/PriceChart'));

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);

  const handleSymbolClick = (symbolId: string) => {
    dispatch(setActiveSymbol(symbolId === activeSymbol ? null : symbolId));
  };

  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          <Suspense fallback={<Loading />}>
            <PriceChart symbolId={activeSymbol} />
          </Suspense>
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid onSymbolClick={handleSymbolClick} clickedCard={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;