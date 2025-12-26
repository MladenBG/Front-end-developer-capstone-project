// Reservation.js
import React, { useReducer } from "react";
import BookingForm from "./components/BookingForm";

function updateTimes(state, date) {
  return state;
}

function initializeTimes() {
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
}

export default function Reservation() {
  const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);

  return (
    <div>
      <h1>Reserve a Table</h1>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}
