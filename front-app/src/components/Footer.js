import logo from '../assets/images/logo.jpg';
import { NavLink } from "react-router-dom";   // use React Router for navigation

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content" >
        <img
          src={logo}
          alt="Little Lemon restaurant logo"
           className="footer-logo"
        />
        <h3 id="hhh">Little Lemon @Copyright 2025 Mladen Vukcevic</h3>
        <nav className="footer-nav">
          <NavLink to="/home">Home</NavLink>
           <NavLink to="/about">About</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/reservation">Reservation</NavLink>
          <NavLink to="/orders">Orders</NavLink>
          <NavLink to="/registration">Registration</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;