import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const countdownDate = new Date(expiryDate);
  const [timeLeft, setTimeLeft] = useState(countdownDate - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(countdownDate - new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [countdownDate]);

  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <>
      {timeLeft > 0 ? <div className="de_countdown">{`${hours}h ${minutes}m ${seconds}s`}</div> : null}
    </>
  );
};

export default Countdown;
