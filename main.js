import './style.css';
import Chart from 'chart.js/auto';
import { createDbWorker } from 'sql.js-httpvfs';

const workerConfig = {
  from: 'cdn',
  config: {
    serverMode: 'full',
    url: '/currency.db',
  }
};

let db;
let currentUser = null;
let chart = null;

// Initialize database
async function initDB() {
  try {
    const worker = await createDbWorker(workerConfig);
    db = worker;
    await createTables();
  } catch (err) {
    console.error('Database initialization failed:', err);
  }
}

async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS conversions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      from_currency TEXT,
      to_currency TEXT,
      amount REAL,
      result REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`
  ];

  for (const query of queries) {
    await db.db.exec(query);
  }
}

// API functions
async function fetchExchangeRates(base = 'EUR') {
  try {
    const response = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch exchange rates:', err);
    return null;
  }
}

async function fetchHistoricalRates(currency, days = 7) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  try {
    const response = await fetch(
      `https://api.frankfurter.app/${start.toISOString().split('T')[0]}..${
        end.toISOString().split('T')[0]
      }?from=EUR&to=${currency}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch historical rates:', err);
    return null;
  }
}

// UI functions
async function updateCurrencySelects() {
  const rates = await fetchExchangeRates();
  if (!rates) return;

  const currencies = Object.keys(rates.rates);
  const selects = [document.getElementById('fromCurrency'), document.getElementById('toCurrency')];

  selects.forEach(select => {
    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.textContent = currency;
      select.appendChild(option);
    });
  });
}

async function updateConversion() {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  const rates = await fetchExchangeRates(from);
  if (!rates) return;

  const rate = rates.rates[to];
  const result = (amount * rate);
  
  document.getElementById('result').textContent = 
    `${amount} ${from} = ${result} ${to}`;

  if (currentUser) {
    saveConversion(amount, from, to, result);
  }
}

async function updateChart() {
  const currency = document.getElementById('toCurrency').value;
  const data = await fetchHistoricalRates(currency);
  if (!data) return;

  const dates = Object.keys(data.rates);
  const rates = dates.map(date => data.rates[date][currency]);

  if (chart) {
    chart.destroy();
  }

  const ctx = document.getElementById('rateChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: `EUR to ${currency}`,
        data: rates,
        borderColor: '#646cff',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}

// Event Listeners
document.getElementById('amount').addEventListener('input', updateConversion);
document.getElementById('fromCurrency').addEventListener('change', updateConversion);
document.getElementById('toCurrency').addEventListener('change', () => {
  updateConversion();
  updateChart();
});

document.getElementById('loginBtn').addEventListener('click', () => {
  document.getElementById('loginModal').style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // In a real app, you'd hash the password and properly authenticate
  currentUser = { id: 1, username };
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('loginBtn').textContent = `Logout (${username})`;
});

// Initialize
async function init() {
  await initDB();
  await updateCurrencySelects();
  await updateConversion();
  await updateChart();
}

init();