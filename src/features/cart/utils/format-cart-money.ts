export function formatCartMoney(amount: number): string {
  return new Intl.NumberFormat('en-EU', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
