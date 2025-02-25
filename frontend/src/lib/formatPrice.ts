export const formatPrice = (value: number): string => {
  let formattedValue = '';
  if (value >= 1_000_000) {
    formattedValue = `${Math.round(value / 1_000_000)}M`;
  } else if (value >= 1_000) {
    formattedValue = `${Math.round(value / 1_000)}K`;
  } else {
    formattedValue = Math.round(value).toString();
  }
  return `$${formattedValue}`;
};