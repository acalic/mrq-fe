import './performanceCard.css';
import { memo } from 'react';
import { stockTypes } from '@/lib/types';
import PerformanceInfo from './src/PerformanceInfo';
import TrendLabel from './src/VolumeLabel';

type PerformanceCardProps = {
  title: string;
  volume: number;
  change: number;
  trend?: stockTypes.Trend;
};

const PerformanceCard = ({ title, volume, change, trend }: PerformanceCardProps) => {
  return (
    <div className="performanceCard">
      <PerformanceInfo label={title} change={change} />
      <TrendLabel change={change} volume={volume} />
    </div>
  );
};
export default memo(PerformanceCard);
