import Chart from 'chart.js/auto';
import { fetchHistoricalRates } from './api.js';

let chartInstance = null;

export function setupChart() {
  // Destroy existing chart if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = document.getElementById('rate-chart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Exchange Rate',
        data: [],
        borderColor: '#646cff',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => value
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => `Rate: ${context.parsed.y}`
          }
        }
      }
    }
  });
}

export async function updateChart(fromCurrency, toCurrency) {
  const data = await fetchHistoricalRates(fromCurrency, toCurrency);
  const dates = Object.keys(data.rates);
  const rates = dates.map(date => data.rates[date][toCurrency]);

  if (chartInstance) {
    chartInstance.data.labels = dates;
    chartInstance.data.datasets[0].data = rates;
    chartInstance.data.datasets[0].label = `${fromCurrency} to ${toCurrency}`;
    chartInstance.update('none'); // Use 'none' mode for smoother updates
  }
}