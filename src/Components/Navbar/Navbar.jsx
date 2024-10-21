import React, { useContext } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { CoinContext } from '../../Contexts/CoinContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Destructure `setCurrency` from CoinContext
  const { setCurrency } = useContext(CoinContext);

  const currencyChange = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
     
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <div className='navbar'>
      <Link to={'/'}>
      <img src={logo} alt="logo" className='logo' />
      </Link>
      <ul>
      <Link to={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="navRight">
        <select onChange={currencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>        
        </select>
        <button>Sign Up</button>
      </div>
    </div>
  );
};

export default Navbar;
