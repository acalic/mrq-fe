import upArrow from '@/assets/up.png';
import downArrow from '@/assets/down.png';

type CardHeaderProps = {
  id: string;
  trend: 'UP' | 'DOWN' | null;
};

const CardHeader = ({ id, trend }: CardHeaderProps) => {
  const trendIcon = trend === 'UP' ? upArrow : trend === 'DOWN' ? downArrow : null;

  return (
    <div className="symbolCard__header">
      <span className="symbolCard__id">{id}</span>
      {trendIcon && <img src={trendIcon} alt={trend || 'no-trend'} className="symbolCard__trend-icon" />}
    </div>
  );
};

export default CardHeader;