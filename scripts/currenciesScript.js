const convertButton = document.getElementById('convert_button');  
const clearButton = document.getElementById('clear_button');  
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountSelect = document.getElementById('amount');
window.addEventListener('DOMContentLoaded', () => {
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
        if(amountSelect.value != ""){
            convert(fromCurrencySelect.value, toCurrencySelect.value);
        }
    });

    clearButton.addEventListener('click', () => {
        console.log("Clear button");
        localStorage.clear();
        location.href="currencies.html";
    });
});

function populateCurrencyDropdowns() {
    const popularCurrencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'PLN'];
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    // Wypełnianie list rozwijanych
    popularCurrencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
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

function convert(baseCurrency, targetCurrency){
    console.log("Login: ", baseCurrency, targetCurrency);
    const resultDiv = document.getElementById('result');
    fetch('https://memqowsky-github-io.onrender.com/login', {
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

