'use client';

import { useState, useEffect } from "react";

const ExchangeForm = () => {
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencyData, setCurrencyData] = useState(null);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const responseCurrencies = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);
        const data = await responseCurrencies.json();
        setCurrencies(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrencies();
  }, []);

  const getCurrencyData = async () => {
    try {
      const responseCurrencyData = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}/${toCurrency}.json`);
      const data = await responseCurrencyData.json();
      console.log(data)
      setCurrencyData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getCurrencyData();
  }

  return (
    <>
    {currencies &&(
      <form className="" onSubmit={handleSubmit}>
        <input type="number" value={currencyAmount} onChange={e => setCurrencyAmount(e.target.value)} />
        <select value={currency} onChange={e => setCurrency(e.target.value)}>
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyName}
            </option>
          ))}
        </select>
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyName}
            </option>
          ))}
        </select>
        <button type="submit">Check</button>
      </form>
      )}
      {currencyData && (
        <div>
          <p>Your money: {currencyAmount} {(currency).toUpperCase()}</p>
          <p>Your money in the chosen currency: {(currencyAmount * currencyData[toCurrency]).toFixed(2)} {(toCurrency).toUpperCase()}</p>
        </div>
      )}
      
    </>
  )
}

export default ExchangeForm;
