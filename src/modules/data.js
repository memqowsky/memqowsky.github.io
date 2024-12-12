import { fetchExchangeRates } from './api.js';
import { updateCurrencySelects } from './ui.js';
import { updateChart } from './chart.js';

export async function loadInitialData() {
  const rates = await fetchExchangeRates();
  if (!rates) return;

  const currencies = Object.keys(rates);
  updateCurrencySelects(currencies);
  
  // Initialize chart with EUR to USD
  await updateChart('EUR', 'USD');
}