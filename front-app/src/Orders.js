import React, { useState, useEffect } from "react";
import "./Orders.css";
import Search from "./components/Search";

function Orders({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sampleProducts = [
      { id: 1, name: "Lemon Cake", price: 20, image: "/images/Lemon-Cake.png", description: "Rich and moist lemon cake" },
      { id: 2, name: "Bolognese", price: 20, image: "/images/Bolognese.jpg", description: "Classic Italian pasta dish" },
      { id: 3, name: "Greek Salad", price: 5, image: "/images/GreekSalad.jpg", description: "Fresh salad with feta and olives" },
      { id: 4, name: "Italian Bean", price: 12, image: "/images/italianbean.jpg", description: "Made with simple pantry-friendly ingredients like onions, beans, garlic, tomato." },
      { id: 5, name: "Italian Piroshki", price: 21, image: "/images/piroshka.webp", description: "Fresh salad with feta and olives" },
      { id: 6, name: "Vegetarian Pizza", price: 20, image: "/images/vegetarian-pizza-54426-1.jpeg", description: "Delicious vegetarian pizza" },
      { id: 7, name: "Mushroom Beef", price: 40, image: "/images/Mushroom-Beef-Prosciutto-Wrapped-Polpettone.jpg", description: "Beef with mushrooms" },
      { id: 8, name: "Prosciutto Wrapped Beef", price: 40, image: "/images/prosciutto-wrapped-beef-with-pesto-75724-1.jpeg", description: "Beef wrapped in prosciutto" },
      { id: 9, name: "Perfecte Pizza", price: 22, image: "/images/perfecte-pizza-2024m05-800x533px.jpg", description: "Perfect pizza with toppings" },
      { id: 10, name: "Pizza with Eggs", price: 25, image: "/images/pizza-with-eggs-1280x720-1.jpg", description: "Pizza topped with eggs" },
      { id: 11, name: "Marinique", price: 8, image: "/images/merinque.jpeg", description: "Light meringue dessert" },
      { id: 12, name: "Marinique Cake with Chocolate", price: 10, image: "/images/meringue cake-withchocolate.jpg", description: "Chocolate meringue cake" },
      { id: 13, name: "Nutella Cake", price: 11, image: "/images/nutella-cake-105468-1.jpeg", description: "Cake with Nutella filling" },
      { id: 14, name: "Ice cream", price: 3, image: "/images/x.jpg", description: "Classic ice cream" },
      { id: 15, name: "Ice cream with Pistache", price: 5, image: "/images/icecream2.webp", description: "Pistachio ice cream" },
      { id: 16, name: "Cappuccino", price: 4, image: "/images/CAPPUCCINO.jpg", description: "Freshly brewed coffee" },
      { id: 17, name: "Coca Cola", price: 5, image: "/images/cocacola.jpg", description: "Refreshing soft drink" },
      { id: 18, name: "Domestic Vine", price: 30, image: "/images/vine.webp", description: "Local wine" },
    ];
    setProducts(sampleProducts);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="orders-container">
      <h2 className="orders-title">Today Menu</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="orders-grid">
        {filteredProducts.length === 0 ? (
          <p className="loading-text">No products found...</p>
        ) : (
          filteredProducts.map((p) => (
            <div key={p.id} className="order-card">
              <div className="order-header">
                <img src={p.image} alt={p.name} className="order-image" />
                <h3 className="order-name">{p.name}</h3>
                <p className="order-price">€{p.price}</p>
              </div>
              <p className="order-description">{p.description}</p>
              <button className="buy-button" onClick={() => addToCart(p)}>
                Buy Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
