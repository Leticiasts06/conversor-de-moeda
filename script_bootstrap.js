
const apiUrl = `https://v6.exchangerate-api.com/v6/0356ac29cb7f374f47ba57db/latest/USD`;
const apiKey = '0356ac29cb7f374f47ba57db';

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const resultDiv = document.getElementById('result');
const spinner = document.getElementById('spinner');

// Carrega as moedas disponíveis
async function loadCurrencies() {
  try {
    spinner.classList.remove('d-none');
    const response = await fetch(`${apiUrl}`);
    const data = await response.json();

    if (!data.conversion_rates) throw new Error('Nenhuma moeda encontrada.');

    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach((currency) => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      fromCurrency.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      toCurrency.appendChild(option2);
    });
    fromCurrency.value = 'USD';
    toCurrency.value = 'BRL';
  } catch (error) {
    console.error('Erro ao carregar moedas:', error);
    resultDiv.textContent = 'Erro ao carregar moedas. Tente novamente mais tarde.';
  } finally {
    spinner.classList.add('d-none');
  }
}

// Converte o valor
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (!amountValue || amountValue <= 0) {
    resultDiv.textContent = 'Por favor, insira um valor válido.';
    return;
  }

  try {
    spinner.classList.remove('d-none');
    const response = await fetch(`${apiUrl}`);
    const data = await response.json();

    if (!data.conversion_rates[to]) throw new Error('Taxa de conversão não disponível.');

    const rate = data.conversion_rates[to];
    const convertedAmount = (amountValue * rate).toFixed(2);
    resultDiv.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error('Erro ao converter moedas:', error);
    resultDiv.textContent = 'Erro ao realizar a conversão.';
  } finally {
    spinner.classList.add('d-none');
  }
}

convertButton.addEventListener('click', convertCurrency);
window.addEventListener('load', loadCurrencies);

console.log('API Key:', apiKey);
