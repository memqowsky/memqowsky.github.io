import { getHistory } from './storage.js';

export function updateCurrencySelects(currencies) {
  const fromSelect = document.getElementById('from-currency');
  const toSelect = document.getElementById('to-currency');
  
  const options = currencies.map(currency => 
    `<option value="${currency}">${currency}</option>`
  ).join('');
  
  fromSelect.innerHTML = options;
  toSelect.innerHTML = options;
  
  fromSelect.value = 'EUR';
  toSelect.value = 'USD';
}

export function updateHistory() {
  const history = getHistory();
  const historyList = document.getElementById('history-list');
  
  historyList.innerHTML = history.map(conversion => `
    <div class="history-item">
      ${conversion.amount} ${conversion.from} = 
      ${conversion.result} ${conversion.to}
      <small>(${new Date(conversion.date).toLocaleString()})</small>
    </div>
  `).join('');
}