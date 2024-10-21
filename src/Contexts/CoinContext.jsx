import { createContext, useEffect, useState } from "react";

// Correct: create the context by calling createContext()
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: 'usd',
    symbol: "$"
  });

  // Function to fetch coins data based on the selected currency
  const fetchCoins = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-vfLrFfoNeWX9BqwKUtFzz2hN' }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch coins when the currency changes
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Provide state and functions via context
  const contextValue = {
    coins,
    currency,
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
