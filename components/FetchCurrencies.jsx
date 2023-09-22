

export const fetchCurrencies = async () => {
    try {
      const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching currencies:", error);
      throw error;
    }
  };
  