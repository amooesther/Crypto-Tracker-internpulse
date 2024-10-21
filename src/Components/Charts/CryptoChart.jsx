import React, { useState, useEffect } from 'react';  
import Chart from 'react-google-charts';

const CryptoChart = ({ coinChart }) => {
  const [data, setData] = useState([['Date', 'Prices']]);  

  useEffect(() => {
    let dataCopy = [['Date', 'Prices']];  

    if (coinChart && coinChart.prices) {
      coinChart.prices.forEach(item => {
        // Convert the timestamp to a readable date format
        const date = new Date(item[0]).toLocaleDateString().slice(0, -5);
        const price = item[1];  // Price value
        dataCopy.push([date, price]);  // Push each entry to dataCopy
      });
      setData(dataCopy);  // Update the state with the new data
    }
  }, [coinChart]);  // Re-run the effect when coinChart changes

  return (
    <div>
      <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
      />
    </div>
  );
};

export default CryptoChart;
