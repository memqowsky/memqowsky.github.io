import { fetchExchangeRates } from './api.js';

export async function convert(amount, fromCurrency, toCurrency) {
  const rates = await fetchExchangeRates(fromCurrency);
  return amount * rates[toCurrency];
}