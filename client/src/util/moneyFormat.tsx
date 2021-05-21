export function moneyFormat(ammount: number): string {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(ammount / 100);
}