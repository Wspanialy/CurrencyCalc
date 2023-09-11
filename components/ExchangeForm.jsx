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
      setCurrencyData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(currencyAmount <= 0){
      console.log("Can not be 0 or less")
    }
    else{
    getCurrencyData();
    }
  }

  return (
    <>
    {currencies &&(
      <form className="flex flex-col flex-wrap p-3" onSubmit={handleSubmit}>
        Your money:<input type="number" className="" required value={currencyAmount} onChange={e => setCurrencyAmount(e.target.value)} />
        <div className="flex-row">
        Choose your currency: <select value={currency} className="" size="4" onChange={e => setCurrency(e.target.value)}>
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyName}
            </option>
          ))}
        </select>
        To which currency you want to exchange?<select value={toCurrency} className="" size="4" onChange={e => setToCurrency(e.target.value)}>
          {Object.entries(currencies).map(([currencyCode, currencyName]) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyName}
            </option>
          ))}
        </select>
        </div>
        <button type="submit" className="bg-green-600 text-white font-bold rounded border-2 hover:border-green-800">Check</button>
      </form>
      )}
      {currencyData && (
        <div className="flex flex-col p-3">
          <p>Your money: {currencyAmount} {(currency).toUpperCase()}</p>
          <p>Your money in the chosen currency: {(currencyAmount * currencyData[toCurrency]).toFixed(2)} {(toCurrency).toUpperCase()}</p>
          <p>Exchange date information: { currencyData[0] }</p>
        </div>
        
      )}
      
    </>
  )
}

export default ExchangeForm;
