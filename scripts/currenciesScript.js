const convertButton = document.getElementById('convert_button');
const clearButton = document.getElementById('clear_button');
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountSelect = document.getElementById('amount');
const logoutButton = document.getElementById('logout');

let chartInstance = null;

window.addEventListener('DOMContentLoaded', async () => {
    await prepareForFetchHistoricalRates();
    populateCurrencyDropdowns();

    // Przywrócenie historii konwersji z localStorage
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    localStorage.clear()
    history.reverse().forEach(item => {
        addConversionToHistory(item.baseCurrency, item.targetCurrency, item.amount, item.result);
    });

    convertButton.addEventListener('click', () => {
        console.log("Convert button");
        console.log("Amount: ", amountSelect.value);
        if (amountSelect.value != "") {
            convert(fromCurrencySelect.value, toCurrencySelect.value);
        }
    });

    clearButton.addEventListener('click', () => {
        console.log("Clear button");
        localStorage.clear();
        location.href = "currencies.html";
    });

    toCurrencySelect.addEventListener('change', (event) => {
        console.log('Selected To Currency:', event.target.value);
        fetchHistoricalRates();
    });

    logoutButton.addEventListener('click', () => {
        console.log("Clock")
        location.href="index.html";
    });
});

function populateCurrencyDropdowns() {
    let popularCurrencies = ['EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'PLN'];
    let fromCurrencySelect = document.getElementById('from-currency');
    let toCurrencySelect = document.getElementById('to-currency');

    const optionFrom = document.createElement('option');
    optionFrom.value = "USD";
    optionFrom.textContent = "USD";
    fromCurrencySelect.appendChild(optionFrom);

    // Wypełnianie list rozwijanych
    popularCurrencies.forEach(currency => {
        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
    let randomIndex = Math.floor(Math.random() * popularCurrencies.length);
    toCurrencySelect.value = popularCurrencies[randomIndex];
}

function addConversionToHistory(baseCurrency, targetCurrency, amount, result) {
    const historyList = document.getElementById('history');
    const listItem = document.createElement('li');
    listItem.textContent = `${amount} ${baseCurrency} = ${result} ${targetCurrency}`;

    // Sprawdź, czy ten rekord już nie istnieje w historii
    const history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
    const existingRecord = history.find(item =>
        item.baseCurrency === baseCurrency &&
        item.targetCurrency === targetCurrency &&
        item.amount === amount &&
        item.result === result
    );

    if (!existingRecord) {
        historyList.prepend(listItem); // Dodaj nowy element na początku listy
        history.unshift({ baseCurrency, targetCurrency, amount, result }); // Dodaj do początku tablicy historii

        // Utrzymaj tylko 10 elementów i odwróć kolejność
        if (history.length > 10) {
            history.pop(); // Usuń najstarszy element
        }

        localStorage.setItem('conversionHistory', JSON.stringify(history.reverse())); // Odwróć tablicę przed zapisaniem
    }
}

function convert(baseCurrency, targetCurrency) {
    console.log("Login: ", baseCurrency, targetCurrency);
    const resultDiv = document.getElementById('result');
    fetch('https://memqowsky-github-io.onrender.com/getCurriencies', {
    // fetch('http://localhost:3000/getCurriencies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ baseCurrency, targetCurrency })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("DATA:");
                console.log(data);
                const resultText = `${amountSelect.value} ${baseCurrency} = ${(data.rate * amountSelect.value).toFixed(2)} ${targetCurrency}`;
                resultDiv.innerHTML = resultText;
                addConversionToHistory(baseCurrency, targetCurrency, amountSelect.value, (data.rate * amountSelect.value).toFixed(2));
                amountSelect.value = ""; // Ustawia pole na pusty ciąg po konwersji
            } else {
                console.log("Error in fetching data frontend");
            }
        })
        .catch(() => {
            console.log("Error in fetching data frontend catched");
        });
}

async function drawChart(fromCurrency, toCurrency, currencyData) {

    if (chartInstance) {
        chartInstance.destroy();
    }

    console.log("Important logs");
    const labelsToChart = Object.keys(currencyData.rates);
    const dataToChart = Object.values(currencyData.rates);

    console.log(labelsToChart);
    console.log(dataToChart);

    const ctx = document.getElementById('chart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsToChart,
            datasets: [{
                label: `Exchange Rate (${fromCurrency} to ${toCurrency})`,
                data: dataToChart,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category', // categories instead of dates for a simple line chart
                    title: {
                        display: true,
                        text: 'Dates'
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Exchange Rate'
                    }
                }
            }
        }
    });
}

async function prepareForFetchHistoricalRates(){
    setTimeout(() => {
        fetchHistoricalRates();
      }, "1000");
}

async function fetchHistoricalRates() {
    const baseCurrency = document.getElementById('from-currency').value;
    const targetCurrency = document.getElementById('to-currency').value;
    const days = 7;

    try {
        const response = await fetch('https://memqowsky-github-io.onrender.com/getHistoricalRates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ baseCurrency, targetCurrency, days })
        });
        const data = await response.json();
        if (data.success) {
            console.log(data);
            drawChart(baseCurrency, targetCurrency, data);
        } else {
            console.log('Failed to fetch historical data');
        }
    } catch (error) {
        console.error('Error fetching historical rates:', error);
    }
}

