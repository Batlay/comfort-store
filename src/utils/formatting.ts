export function formatPriceInUSD(price: number): string {
  return (price/100).toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    style: 'currency',
    currency: 'USD'
  });
}