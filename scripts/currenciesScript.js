const convertButton = document.getElementById('convert_button');  
const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountSelect = document.getElementById('amount');
window.addEventListener('DOMContentLoaded', () => {
    populateCurrencyDropdowns();
    convertButton.addEventListener('click', () => {
        console.log("Convert button");
        console.log("Amount: ", amountSelect.value);
        convert(fromCurrencySelect.value, toCurrencySelect.value);
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

function convert(baseCurrency, targetCurrency){
    console.log("Login: ", baseCurrency, targetCurrency);
    fetch('https://memqowsky-github-io.onrender.com/getCurriencies', {
    const resultDiv = document.getElementById('result');
    fetch('http://localhost:3000/getCurriencies', {
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
      } else {
        console.log("Error in fetching data frontend");
      }
    })
    .catch(() => {
        console.log("Error in fetching data frontend catched");
    });
}