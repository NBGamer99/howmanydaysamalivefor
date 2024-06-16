'use client';

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [daysLived, setDaysLived] = useState<number | null>(null);
  const [showGrid, setShowGrid] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const calculateDaysLived = (birthDate: Date) => {
    const now = new Date();
    const days = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
    return days;
  };

  const startCounting = (birthDate: Date) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setDaysLived(calculateDaysLived(birthDate));
    }, 100); // Update every 100 milliseconds
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ageNumber = parseInt(age);
    if (isNaN(ageNumber) || ageNumber < 0 || ageNumber > 120) {
      setError("Please enter a valid age between 0 and 120.");
      setDaysLived(null);
    } else {
      setError("");
      const now = new Date();
      const birthDate = new Date(now.getFullYear() - ageNumber, now.getMonth(), now.getDate());
      startCounting(birthDate);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleToggleGrid = () => {
    setShowGrid(!showGrid);
  };

  return (
    <main>
      {daysLived === null ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={age}
            onChange={handleInputChange}
            placeholder="Ready to get disappointed?"
          />
          {error && <div className="error">{error}</div>}
        </form>
      ) : (
        <>
          <div className="result">
            {daysLived.toFixed(5)} <span className="days">days</span>
          </div>
          <button className="button" onClick={handleToggleGrid}>
            {showGrid ? "Hide Weeks Grid" : "Show Weeks Grid"}
          </button>
          {showGrid && (
            <div className="grid-container">
              <div className="grid">
                {Array.from({ length: Math.floor(daysLived / 7) }).map((_, index) => (
                  <div key={index} className="dot"></div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
