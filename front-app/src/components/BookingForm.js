import React, { useState, useEffect } from 'react';
import { fetchAPI, submitAPI } from '../api';

const occasions = ['Birthday', 'Anniversary', 'Business', 'Other'];

function BookingForm() {
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 🔄 Update available times whenever date changes
  useEffect(() => {
    if (resDate) {
      const dateObj = new Date(resDate);
      const times = fetchAPI(dateObj) || [];   // ✅ safe default
      setAvailableTimes(times);
      setResTime(times.length > 0 ? times[0] : '');
    }
  }, [resDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // ✅ Validation
    if (!resDate) {
      setErrorMessage("⚠️ Please select a date.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(resDate);

    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      setErrorMessage("⚠️ Date cannot be in the past.");
      return;
    }

    if (guests < 1 || guests > 10) {
      setErrorMessage("⚠️ Guests must be between 1 and 10.");
      return;
    }

    // ✅ Simulate API submission
    const formData = { resDate, resTime, guests, occasion };
    if (submitAPI(formData)) {
      setSuccessMessage(
        `🎉 Reservation confirmed for ${guests} guests on ${resDate} at ${resTime} (${occasion})`
      );
    } else {
      setErrorMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setResDate('');
    setResTime('');
    setAvailableTimes([]);
    setGuests(1);
    setOccasion('Birthday');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={resDate}
        onChange={(e) => setResDate(e.target.value)}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={resTime}
        onChange={(e) => setResTime(e.target.value)}
        required
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        min={1}
        max={10}
        id="guests"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        {occasions.map((occ) => (
          <option key={occ}>{occ}</option>
        ))}
      </select>

      <input
        className="butt"
        type="submit"
        value="Make Your reservation"
        disabled={!resDate}
      />
      <button className="butt2" type="button" onClick={resetForm}>Reset</button>

      {errorMessage && (
        <div className="error-box" aria-live="polite">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-box" aria-live="polite">
          {successMessage}
        </div>
      )}
    </form>
  );
}

export default BookingForm;
