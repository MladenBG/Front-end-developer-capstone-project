// Home.js
import React, { useReducer } from "react";
import BookingForm from "./components/BookingForm";
import "./Home.css";

function updateTimes(state, action) {
  switch (action.type) {
    case "update":
      // TODO: add date-based logic later
      return state;
    default:
      return state;
  }
}

function initializeTimes() {
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
}

export default function Home() {
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  return (
    <main className="home-container">
      <h1>Welcome to Little Lemon</h1>

      {/* Images row */}
      <section className="image-layout">
        <div className="ba">
          <img src="/images/p.avif" alt="Little Lemon bakers preparing food" />
          <p>Our happy restaurant serves fine dishes and offers a great atmosphere.</p>
        </div>
        <div className="cake">
          <img src="/images/Lemon-Cake.png" alt="A slice of lemon cake" />
        </div>
      </section>

      {/* Booking form */}
      <section className="booking-section">
        <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
      </section>
    </main>
  );
}
