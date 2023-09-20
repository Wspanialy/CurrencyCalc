'use client';

import React, { useState, useEffect } from "react";
import Summary from "./Summary";

const ExchangeForm = () => {
  const [currencyAmount, setCurrencyAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencyData, setCurrencyData] = useState(null);
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);
        const data = await response.json();
        setCurrencies(data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}/${toCurrency}.json`);
      const data = await response.json();
      setCurrencyData(data);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!currencyAmount || isNaN(currencyAmount) || parseFloat(currencyAmount) <= 0) {
      alert("Please enter a valid currency amount.");
    } else {
      fetchCurrencyData();
    }
  }

  const renderCurrencyOptions = () => {
    return Object.entries(currencies).map(([currencyCode, currencyName]) => (
      <option key={currencyCode} value={currencyCode}>
        {currencyName}
      </option>
    ));
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      {currencies && (
        <form className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto bg-white p-4 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currencyAmount" className="block text-gray-600 font-semibold">Your money:</label>
            <input
              type="number"
              id="currencyAmount"
              className="border-2 border-gray-300 rounded p-2 w-full"
              required
              value={currencyAmount}
              onChange={e => setCurrencyAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="currency" className="block text-gray-600 font-semibold">Choose your currency:</label>
            <select
              id="currency"
              value={currency}
              className="border-2 border-gray-300 rounded p-2 w-full"
              onChange={e => setCurrency(e.target.value)}
            >
              {renderCurrencyOptions()}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="toCurrency" className="block text-gray-600 font-semibold">To which currency you want to exchange?</label>
            <select
              id="toCurrency"
              value={toCurrency}
              className="border-2 border-gray-300 rounded p-2 w-full"
              onChange={e => setToCurrency(e.target.value)}
            >
              {renderCurrencyOptions()}
            </select>
          </div>
          <button type="submit" className="bg-green-600 text-white font-bold rounded-lg p-2 hover:bg-green-800 w-full">
            Check
          </button>
        </form>
      )}
      {currencyData && (
        <Summary
          currencyAmount={currencyAmount}
          currency={currency}
          toCurrency={toCurrency}
          currencyData={currencyData}
        />
      )}
    </div>
  )
}

export default ExchangeForm;
