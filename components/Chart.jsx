'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, currencyLabel }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const ctx = chartRef.current.getContext('2d');
      console.log('Data:', data);

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(item => item.date),
          datasets: [
            {
              label: currencyLabel,
              data: data.map(item => item[currencyLabel]),
              borderColor: 'blue',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true, // Włącz responsywność wykresu
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: currencyLabel,
              },
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data, currencyLabel]);

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-8 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <div className="w-full"> {/* Usunięto klasę h-80 */}
          <canvas ref={chartRef} className="w-full"></canvas>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChartComponent;
