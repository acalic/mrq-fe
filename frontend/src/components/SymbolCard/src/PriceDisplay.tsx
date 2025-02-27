import React from 'react';
import { formatPrice } from '@/lib';

type PriceDisplayProps = {
  price: number;
};

const PriceDisplay = React.memo(({ price }: PriceDisplayProps) => (
  <div className="symbolCard__price">
    <span className="symbolCard__price-label">Price:</span>
    <span className="symbolCard__price-value">{formatPrice(price) || '--'}</span>
  </div>
));

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;