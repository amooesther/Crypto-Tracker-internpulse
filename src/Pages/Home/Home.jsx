import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Contexts/CoinContext'
import {Link} from 'react-router-dom'


const Home = () => {
const {coins,currency}=useContext(CoinContext);
const[displayCrypto, setDisplayCrypto]=useState([])
const [search,setSearch]=useState("")

const handleSearch=(e)=>{
setSearch(e.target.value)
if(e.target.value===""){
    setDisplayCrypto(coins)
}
}

const searchResultHandler= async (e)=>{
e.preventDefault();
const bit=  await coins.filter((item)=>{
return item.name.toLowerCase().includes(search.toLowerCase())
})
setDisplayCrypto(bit);
}
useEffect(() => {
    setDisplayCrypto(coins);
  }, [coins]);



  return (
    <div className='home'>
        <div className="hero">
            <h1>Crypto tracker</h1>
            <p>Welcome to Crypto Tracker, your online crypto market place</p>
            <form onSubmit={searchResultHandler}>
                <input onChange={handleSearch} value={search} type="text" placeholder='Search crypto' required/>
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className="cryptoList">
            <div className="layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:'center'}}>24 Hour Change</p>
                <p className='marketCapital'>Market Capital</p>
                <p className='marketCapital'>Trading Vol.</p>
                
            </div>
            {
                displayCrypto.slice(0,10).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className="layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name + " - " + item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0 ?'green':'red'}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                       
                        <p className="marketCapital"> {currency.symbol}{item.market_cap.toLocaleString()}</p>
                        <p className="marketCapital">{item.total_volume}</p>
                     
                       
                    </Link>

                ))
            }
        </div>
      
    </div>
  )
}

export default Home