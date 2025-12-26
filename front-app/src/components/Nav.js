import { Link } from 'react-router-dom';

import React from 'react';
import logo from '../assets/images/logo.jpg';
function Nav () {
    return (
 <Nav className="nav-container">
    

    <button className="hamburger" id="hamburger">
      <span />
      <span />
      <span />
    </button>
 
    <ul className="nav-links" id="nav-links">
        <li><img className="photo" src={logo} style={{height:100, width:100}} alt="logo"/></li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About</Link>
      </li>
      <li>
        <Link to="/">Menu</Link>
      </li>
      <li>
        <Link to="/">Reservation</Link>
      </li>
      <li>
        <Link to="/">Orders</Link>
      </li>
      <li>
        <Link to="/">Online</Link>
      </li>
      <li>
        <Link to="/">Login</Link>
      </li>
    </ul>
</Nav>

    );
};


export default Nav;