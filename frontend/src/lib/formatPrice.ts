export const formatPrice = (value: number): string => {
  if (!value && value !== 0) return '--';

  const trillion = 1_000_000_000_000;
  const billion = 1_000_000_000;
  const million = 1_000_000;
  const thousand = 1_000;
  const ten = 10;

  let formattedValue = '';
  if (value >= trillion) {
    formattedValue = `${(value / trillion).toFixed(1)}T`;
  } else if (value >= billion) {
    formattedValue = `${(value / billion).toFixed(0)}B`;
  } else if (value >= million) {
    formattedValue = `${(value / million).toFixed(0)}M`;
  } else if (value >= thousand) {
    formattedValue = `${(value / thousand).toFixed(0)}K`;
  } else if (value < 10) {
    formattedValue = value.toFixed(1);
  } else {
    formattedValue = value.toFixed(2);
  }

  return `$${formattedValue}`;
};