// src/components/Menu.js
import React, { useState, useEffect } from "react";
import "./Menu.css";

function Menu() {
  const [menuItems, setMenuItems] = useState({});

  useEffect(() => {
    const sampleMenu = {
      Pizza: [
        { id: 1, name: "Margherita", price: 14, description: "Classic pizza with tomato and mozzarella" },
        { id: 2, name: "Pepperoni", price: 16, description: "Spicy pepperoni with cheese" },
        { id: 3, name: "Quattro Stagioni", price: 20, description: "Pizza includes artichokes, mushrooms, tomatoes/basil, mozzarella, sousage, eggs, ham and olives." },
        { id: 4, name: "Vegetarian Pizza", price: 13, description: "Pizza topped with a variety of vegetables, cheeses, and sauces" },
        { id: 5, name: "Pizza with Eggs", price: 19, description: "Pizza includes mushrooms, tomatoes, mozzarella, eggs, ham and olives" },
        { id: 6, name: "Perfecte Pizza", price: 21, description: "Spicy pepperoni with cheese" },
        { id: 7, name: "Italian Piroshki", price: 20, description: "Includes mushrooms, tomatoes, mozzarella, sour cream , ham and olives" },
      ],
      Pasta: [
        { id: 8, name: "Bologneze", price: 18, description: "Classic Italian pasta dish" },
        { id: 9, name: "Carbonara", price: 19, description: "Pasta dish made with fatty cured pork, hard cheese, eggs, salt, and black pepper" },
        { id: 10, name: "Pasta al tonno", price: 17, description: "Pasta with a tomato-based sauce rosso or a simple white sauce in 'bianco' using high-quality, oil-packed tuna. " },
      ],
      Specialties: [
        { id: 11, name: "Prosciutto Wrapped Beef", price: 30, description: "Beef wrapped in prosciutto" },
        { id: 12, name: "Mushroom Beef", price: 30, description: "Beef with mushrooms" },
        { id: 13, name: "Porchetta", price: 35, description: "Pork roast, often stuffed with garlic, rosemary, and other herbs, and slow-roasted to tender perfection." },
        { id: 14, name: "Bistecca alla Fiorentina", price: 29, description: "Thick-cut T-bone or porterhouse steak, grilled and seasoned simply, originating from Florence." },
      ],
       Salads: [
        { id: 15, name: "Greek Salad", price: 4, description: "Fresh salad with feta and olives." },
        { id: 16, name: "Caprese Salad", price: 5, description: "With tomato, mozzarella, basil." },
         { id: 17, name: "Panzanella", price: 4, description: "bread salad" },
      ],
      Breads: [
        { id: 15, name: "Ciabatta", price: 2, description: "" },
        { id: 16, name: "Bruschetta", price: 3, description: "With tomato."},
         { id: 16, name: "Pane Pugliese", price: 3, description: ""},
      ],
       Pankakes: [
        { id: 18, name: "Nutela", price: 8, description: "Sweet nutella pencakes." },
        { id: 19, name: "Lemon Pancakes", price: 11, description: "fluffy and filled with delicious lemon flavor." },
        { id: 20, name: "Pankekes marmelade", price: 7, description: "Delicious marmalade pncakes." },
      ],
      Cakes: [
        { id: 21, name: "Lemon Cake", price: 20, description: "Rich and moist lemon cake." },
        { id: 22, name: "Marinique", price: 13, description: "Light meringue dessert." },
        { id: 23, name: "Marinique Cake with Chocolate", price: 15, description: "Chocolate meringue cake." },
         {id: 24, name: "Lemon Drizzle Cake", price: 15, description: "Sponge cake soaked with a sweet and tangy lemon syrup (drizzle)." },
      ],
       "Ice cream": [
        { id: 25, name: "Ice cream", price: 6, description: "Regular ice cream." },
        { id: 26, name: "Ice cream with Pistache", price: 8, description: "Pistachio ice cream." },
         { id: 27, name: "Limone", price: 7, description: "Refreshing lemon flavor." },
      ],
       Drinks: [
        { id: 33, name: "Coca-Cola", price: 2, description: "Refreshing soft drink." },
        { id: 34, name: "Orange Juice", price: 3, description: "Freshly squeezed orange juice." },
        { id: 35, name: "Watter", price: 3, description: "Botled Watter." },
         { id: 36, name: "Bitter Lemon", price: 30, description: "Refreshing drink." },
         { id: 35, name: "Lemon Juice", price: 3, description: "Freshly squeezed lemon juice." },
         { id: 36, name: "Italian Soda", price: 30, description: "Drink made from carbonated water and flavored syrup." },
      ],
      "Alcohol Drinks": [
        { id: 28, name: "Negroni", price: 2, description: "Classic cocktail made with gin, Campari, and sweet vermouth." },
        { id: 29, name: "Bellini", price: 3, description: "A blend of Prosecco and white peach purée, created in Venice." },
         { id: 30, name: "Limoncello", price: 3, description: "Tangy lemon liqueur traditionally from the Amalfi Coast." },
        { id: 31, name: "Grappa", price: 3, description: "Strong brandy made from the pomace left over from winemaking." },
         { id: 32, name: "Domestic Vine", price: 30, description: "Vine." },
      ],
    };

    setMenuItems(sampleMenu);
  }, []);

  return (
    <div className="menu-container">
      <h2 className="menu-title">Our Menu</h2>
      {Object.keys(menuItems).map((category) => (
        <div key={category} className="menu-category">
          <h3 className="category-title">{category}</h3>
          <ul className="menu-list">
            {menuItems[category].map((item) => (
              <li key={item.id} className="menu-item">
                <div className="menu-header">
                  <span className="menu-name">{item.name}</span>
                  <span className="menu-price">€{item.price}</span>
                </div>
                <p className="menu-description">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Menu;
