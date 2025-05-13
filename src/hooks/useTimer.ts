import { useState, useEffect, useRef } from 'react';

export default function useTimer(initialTime: number, onExpire: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);
  const hasExpired = useRef(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    if (timeLeft <= 0) {
      if (!hasExpired.current) {
        onExpire();
        hasExpired.current = true;
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire, isPaused]);


  const resetTimer = () => {
    hasExpired.current = false;
    setTimeLeft(initialTime);
    setIsPaused(false);
  };


  const pauseTimer = () => {
    setIsPaused(true);
  };


  const resumeTimer = () => {
    setIsPaused(false);
  };

  return { timeLeft, resetTimer, pauseTimer, resumeTimer, isPaused };
}