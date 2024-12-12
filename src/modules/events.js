import { convert } from './converter.js';
import { updateChart } from './chart.js';
import { saveConversion } from './storage.js';
import { updateHistory } from './ui.js';

export function setupEventListeners() {
  const convertBtn = document.getElementById('convert-btn');
  const swapBtn = document.getElementById('swap-btn');
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');

  convertBtn.addEventListener('click', handleConversion);
  swapBtn.addEventListener('click', swapCurrencies);
  fromSelect.addEventListener('change', () => updateChart(fromSelect.value, toSelect.value));
  toSelect.addEventListener('change', () => updateChart(fromSelect.value, toSelect.value));
}

async function handleConversion() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;

  const result = await convert(amount, fromCurrency, toCurrency);
  document.getElementById('result').value = result;

  const conversion = {
    date: new Date().toISOString(),
    from: fromCurrency,
    to: toCurrency,
    amount: parseFloat(amount),
    result
  };

  saveConversion(conversion);
  updateHistory();
}

function swapCurrencies() {
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
  handleConversion();
}