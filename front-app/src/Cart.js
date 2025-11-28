import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Cart.css";

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Replace with your key

function CheckoutForm({ total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const res = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total }),
      });
      const { clientSecret } = await res.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful! 🎉");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>Payment Details</h3>
      <CardElement />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay €${total}`}
      </button>
    </form>
   
  );
}

export default function CartPage({ cartItems = [], setCartItems }) {
  const updateQuantity = (id, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.name} - €{item.price}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: €{total}</h3>

          {/* ✅ Wrap CheckoutForm in Elements */}
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} />
          </Elements>
        </>
      )}
    </div>
  );
}
