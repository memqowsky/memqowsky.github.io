const API_BASE = 'https://api.frankfurter.app';

export async function fetchExchangeRates(base = 'EUR') {
  try {
    const response = await fetch(`${API_BASE}/latest?from=${base}`);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    return {};
  }
}

export async function fetchHistoricalRates(base, target) {
  const end = new Date().toISOString().split('T')[0];
  const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  try {
    const response = await fetch(
      `${API_BASE}/${start}..${end}?from=${base}&to=${target}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    return {};
  }
}