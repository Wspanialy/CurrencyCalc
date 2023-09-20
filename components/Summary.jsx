
const Summary = ({ currencyAmount, currency, toCurrency, currencyData }) => {
  return (
    <div className="flex flex-col p-4 md:p-8">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <p className="text-gray-600 font-semibold">Your money: {currencyAmount} {currency.toUpperCase()}</p>
        <p className="text-gray-600 font-semibold">Your money in the chosen currency: {(currencyAmount * currencyData[toCurrency]).toFixed(2)} {toCurrency.toUpperCase()}</p>
        <p className="text-gray-600 font-semibold">Exchange date information: {currencyData.date}</p>
      </div>
    </div>
  )
}

export default Summary;

