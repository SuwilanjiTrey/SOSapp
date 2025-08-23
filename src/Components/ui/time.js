import { useState, useEffect } from 'react';

const useCurrentTime = () => {
  // Use state to hold the current time.
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Use an effect to set up and clean up the interval.
  useEffect(() => {
    // Set an interval to update the time every second.
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // This is the cleanup function. It runs when the component unmounts
    // or before the effect runs again. It's crucial for preventing memory leaks.
    return () => clearInterval(timer);
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  return time;
};

export default useCurrentTime;
