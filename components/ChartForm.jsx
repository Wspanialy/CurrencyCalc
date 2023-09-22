'use client';
import { useState, useEffect } from "react"
import { renderCurrencyOptions } from "./CurrencyOptionsRender";
import { fetchCurrencies } from "./FetchCurrencies";

const ChartForm = () => {
  const [currency, setCurrency] = useState('');
  const [currencies, setCurrencies] = useState({});

    useEffect(() => {
      const getCurrencies = async () => {
        try {
          const response = await fetchCurrencies();
          setCurrencies(response);
        } catch (error) {
          console.error("Error fetching currencies:", error);
        }
      };
      getCurrencies();
    }, []);
    
  return (
    <>
    <form className="">
    <label htmlFor="currency" className="block text-gray-600 font-semibold">Choose your currency:</label>
            <select
              id="currency"
              value={currency}
              className="border-2 border-gray-300 rounded p-2 w-full"
              onChange={e => setCurrency(e.target.value)}
            >
              {renderCurrencyOptions(currencies)}
            </select>



    </form>

    </>
  )
}

export default ChartForm