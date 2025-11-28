import React, { useState } from "react";
import logo from "../assets/images/Asset-18@4x.png";
import { Link } from "react-router-dom";

export default function HamburgerMenu({ cartItems }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(prev => !prev);

  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="site-header">
      <button
        id="hamburger"
        className={`hamburger ${open ? "active" : ""}`}
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="line line-1" />
        <span className="line line-2" />
        <span className="line line-3" />
      </button>

      <nav id="nav-links" className={`nav-links ${open ? "show" : ""}`}>
        <ul>
          <li>
            <img className="photo" src={logo} style={{ height: 100, width: 100 }} alt="logo" />
          </li>
          <li><Link to="/home" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/menu" onClick={() => setOpen(false)}>Menu</Link></li>
          <li><Link to="/reservation" onClick={() => setOpen(false)}>Reservation</Link></li>
          <li><Link to="/orders" onClick={() => setOpen(false)}>Orders</Link></li>
          <li><Link to="/impressions" onClick={() => setOpen(false)}>Impressions</Link></li>
          <li><Link to="/registration" onClick={() => setOpen(false)}>Registration</Link></li>
          <li><Link to="/login" onClick={() => setOpen(false)}>Login</Link></li>
          <li>
            <Link to="/cart" onClick={() => setOpen(false)}>
              Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
