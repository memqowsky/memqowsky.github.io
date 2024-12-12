const HISTORY_KEY = 'conversion_history';

export function saveConversion(conversion) {
  const history = getHistory();
  history.unshift(conversion);
  if (history.length > 10) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory() {
  const history = localStorage.getItem(HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}