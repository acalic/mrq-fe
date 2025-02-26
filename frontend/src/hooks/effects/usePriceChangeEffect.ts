import { useState, useEffect, useRef } from 'react';

type PriceChangeClass = '' | 'symbolCard--shake' | 'symbolCard--glow-green' | 'symbolCard--glow-red';

export const usePriceChangeEffect = (price: number) => {
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [priceChangeClass, setPriceChangeClass] = useState<PriceChangeClass>('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Only proceed if we have a price and either no previous price or a different price
    if (price && (!previousPrice || price !== previousPrice)) {
      if (previousPrice) {
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        let newClass: PriceChangeClass = '';
        const priceChange = Math.abs(price - previousPrice) / previousPrice;

        if (priceChange >= 0.25) {
          newClass = 'symbolCard--shake';
        } else if (price > previousPrice) {
          newClass = 'symbolCard--glow-green';
        } else if (price < previousPrice) {
          newClass = 'symbolCard--glow-red';
        }

        setPriceChangeClass(newClass);

        // Store timeout reference
        timeoutRef.current = setTimeout(() => {
          if (priceChangeClass !== '') {
            setPriceChangeClass('');
          }
        }, 1000);
      }

      setPreviousPrice(price);
    }

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [price]);

  return priceChangeClass;
};