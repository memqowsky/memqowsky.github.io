import { initializeApp } from './modules/app.js';
import { setupEventListeners } from './modules/events.js';
import { loadInitialData } from './modules/data.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initializeApp();
  setupEventListeners();
  await loadInitialData();
});