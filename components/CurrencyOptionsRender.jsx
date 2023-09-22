export const renderCurrencyOptions = (currencies) => {
  return Object.entries(currencies).map(([currencyCode, currencyName]) => (
    <option key={currencyCode} value={currencyCode}>
      {currencyName}
    </option>
  ));
};