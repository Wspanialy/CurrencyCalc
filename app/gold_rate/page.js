'use client';

import React, { useState, useEffect } from "react";

const GoldRate = () => {
  const [goldData, setGoldData] = useState(null);

  useEffect(() => {
    const fetchGoldData = async () => {
      try {
        const response = await fetch("https://api.nbp.pl/api/cenyzlota");
        const data = await response.json();
        if (data.length > 0) {
          setGoldData(data[0]);
        } else {
          console.log("Brak danych o cenie złota.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoldData();
  }, []);

  return (
    <div>
      {goldData ? (
        <div>Cena złota z dnia {goldData.data}: {goldData.cena} PLN</div>
      ) : (
        <div>Ładowanie danych...</div>
      )}
    </div>
  );
};

export default GoldRate;
