import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HamburgerMenu from "./components/HamburgerMenu";
import Home from "./Home";
import Reservation from "./Reservation";
import Orders from "./Orders";
import Menu from "./Menu";
import Login from "./Login";
import Impressions from "./Impressions";
import About from "./About";
import Contact from "./Contact";
import Main from "./components/Main";
import Registration from "./Registration";
import Cart from "./Cart";
import "./App.css";

function App() {
  // ✅ Cart state lives here
  const [cartItems, setCartItems] = useState([]);

  // ✅ Function to add items to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  return (
    <>
      <Header />
      <Router>
        <Main />
        <Footer />
        <HamburgerMenu cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/orders" element={<Orders addToCart={addToCart} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/impressions" element={<div className="page-content"><Impressions /></div>} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
