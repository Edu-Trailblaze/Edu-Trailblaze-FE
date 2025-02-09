export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

export function convertDuration(duration: string) {
  const [hours, minutes] = duration.split(":").map(Number);
  return `${hours + minutes / 60} hours`;
}