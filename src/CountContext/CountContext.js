import { useState, createContext } from "react";

export const CountContext = createContext();

export const CountStore = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((currentCount) => currentCount + 1);
  const decrement = () => setCount((currentCount) => currentCount - 1);
  const reset = () => setCount(0);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};

const CountProvider = (children) => {
  return <CountContext.Provider value={CountStore()} {...children} />;
};

export default CountProvider;
