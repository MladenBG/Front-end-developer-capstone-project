import React, { useState, useEffect, useRef } from "react";
import "./Impression.css";

const slides = [
  { img: "/images/wom1.avif", comment: "Our famous lemon cake 🍋" },
  { img: "/images/woman3.jpg", comment: "Freshly baked bread daily 🥖" },
  { img: "/images/woman2.webp", comment: "Cozy atmosphere for family dinners 👨‍👩‍👧‍👦" },
  { img: "/images/man.avif", comment: "Refreshing cocktails to end the night 🍹" },
];

export default function Impressions() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // function to start slideshow
  const startSlideshow = () => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  // function to stop slideshow
  const stopSlideshow = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startSlideshow();
    return () => stopSlideshow();
  }, []);

  return (
    <div
      className="slideshow"
      onMouseEnter={stopSlideshow}   // pause on hover
      onMouseLeave={startSlideshow} // resume when mouse leaves
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`slide ${i === index ? "active" : ""}`}
        >
          <img src={slide.img} alt="slide" className="slide-image" />
          <p className="slide-comment">{slide.comment}</p>
        </div>
      ))}
    </div>
  );
}
