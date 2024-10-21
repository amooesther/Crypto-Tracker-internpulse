import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Contexts/CoinContext';
import CryptoChart from '../../Components/Charts/CryptoChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);  // Start with null, not undefined
  const [coinChart, setCoinChart] = useState(); 
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-vfLrFfoNeWX9BqwKUtFzz2hN'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);  // Set the coin data after fetching
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };
const fetchCoinChart = async () => {
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-vfLrFfoNeWX9BqwKUtFzz2hN'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    .then(response => response.json())
    .then(response => setCoinChart(response))
    .catch(err => console.error(err));
}
  useEffect(() => {
    fetchCoinData();
    fetchCoinChart();
  }, [currency, coinId]);  // Include coinId in the dependency array to fetch data when the coin changes

  return (
    <div className='coin'>
      {coinData &&  coinChart ?(  // Check if coinData is available before rendering
        <div className="coinName">
          <img src={coinData.image.large} alt={`${coinData.name} logo`} />
          <p>
            <b>{coinData.name} ({coinData.symbol.toUpperCase()})</b>
          </p>
          <div className="coinChart">
          <CryptoChart coinChart={coinChart}/>
          </div>
          <div className="coinInfo">
            <ul>
              <li>Crypto Market Rank</li>
              <li>{coinData.market_cap_rank}</li>
            </ul>
            <ul>
              <li>Current Price</li>
              <li>{currency.symbol}{coinData.market_data.current_price[currency.name]}</li>
            </ul>
          </div>
        </div>
        
      ) : (
         // Show a loading message while the data is being fetched
        <div className="spinner">
        <div className="spin"></div>
        </div>
         
      )}
    </div>
  );
};

export default Coin;
