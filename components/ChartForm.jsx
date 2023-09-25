'use client'

import React, { useState, useEffect } from "react";
import { renderCurrencyOptions } from "./CurrencyOptionsRender";
import { fetchCurrencies } from "./FetchCurrencies";
import Chart from "./Chart";

const ChartForm = () => {
  const [currency, setCurrency] = useState("");
  const [currencies, setCurrencies] = useState({});
  const [toCurrency, setToCurrency] = useState("");
  const [currencyData, setCurrencyData] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [datesToFetch, setDatesToFetch] = useState([]);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const response = await fetchCurrencies();
        setCurrencies(response);
      } catch (error) {
        console.error("Błąd podczas pobierania walut:", error);
      }
    };
    getCurrencies();
  }, []);

  const fetchChartData = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${formattedDate}/currencies/${currency}/${toCurrency}.json`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching currencies:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
      setIsLoading(true);
      const datesToFetch = [];
      const currentDate = new Date(fromDate);

      while (currentDate <= toDate) {
        datesToFetch.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setDatesToFetch(datesToFetch);

      const fetchDataPromises = datesToFetch.map(async (date) => {
        return await fetchChartData(date);
      });

      Promise.all(fetchDataPromises)
        .then((dataArray) => {
          console.log(dataArray);
          setCurrencyData(dataArray);
        })
        .catch((error) => {
          console.error("Error fetching currencies:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error("Wrong dates!");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      {currencies && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto"
        >
          <label htmlFor="currency" className="block text-gray-600 font-semibold">
            Choose currency:
          </label>
          <div className="mb-4">
            <select
              id="currency"
              value={currency}
              className="border-2 border-gray-300 rounded p-2 w-full"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {renderCurrencyOptions(currencies)}
            </select>
          </div>
          <div className="mb-4">
            <select
              id="toCurrency"
              value={toCurrency}
              className="border-2 border-gray-300 rounded p-2 w-full"
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {renderCurrencyOptions(currencies)}
            </select>
          </div>
          <input
            type="date"
            id="date-from"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full mt-1"
          />
          <input
            type="date"
            id="date-to"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border-2 border-gray-300 rounded p-2 w-full mt-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold rounded-lg p-2 hover:bg-green-800 w-full mt-4"
          >
            Generate Chart
          </button>
        </form>
      )}
      {!isLoading &&(
      <Chart data = {currencyData} currencyLabel = {toCurrency} />
      )}
    </div>
  );
};

export default ChartForm;
