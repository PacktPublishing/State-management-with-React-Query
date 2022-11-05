import { useState, useReducer, useContext } from "react";
import { CountContext } from "./CountContext/CountContext";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, reset } from "./Redux/countSlice";
import useCounter from "./Zustand/useCounter";
import { observer } from "mobx-react";
import { GlobalContext } from "./GlobalContext/GlobalContext";

const NotState = ({ aList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }) => {
  const filteredList = aList.filter((item) => item % 2 === 0);
  const value = "a constant value";

  return filteredList.map((item) => <div key={item}>{item}</div>);
};

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((currentCount) => currentCount + 1);
  const decrement = () => setCount((currentCount) => currentCount - 1);
  const reset = () => setCount(0);

  return (
    <div className="App">
      <div>Counter: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const initialState = { count: 0 };

const types = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
};

const reducer = (state, action) => {
  switch (action) {
    case types.INCREMENT:
      return { count: state.count + 1 };
    case types.DECREMENT:
      return { count: state.count - 1 };
    case types.RESET:
      return { count: 0 };
    default:
      throw new Error("This type does not exist");
  }
};

const AppWithReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const increment = () => dispatch(types.INCREMENT);
  const decrement = () => dispatch(types.DECREMENT);
  const reset = () => dispatch(types.RESET);

  return (
    <div className="App">
      <div>Counter: {state.count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const AppWithContext = () => {
  const { count, increment, decrement, reset } = useContext(CountContext);

  return (
    <div className="App">
      <div>Counter: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const AppWithGlobalContext = () => {
  const { selectedTheme, toggleTheme, data, isLoadingData, fetchData } =
    useContext(GlobalContext);

  console.log(data);
  return (
    <div className="App">
      <div>selectedTheme: {selectedTheme}</div>
      <div>Is Loading: {String(isLoadingData)}</div>
      <div>
        <button onClick={toggleTheme}>Theme</button>
        <button onClick={() => fetchData("pikachu")}>Pikachu</button>
      </div>
    </div>
  );
};

const AppWithRedux = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div>Counter: {count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>+1</button>
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
};

const AppWithZustand = () => {
  const { count, increment, decrement, reset } = useCounter((state) => ({
    count: state.count,
    increment: state.increment,
    decrement: state.decrement,
    reset: state.reset,
  }));

  return (
    <div className="App">
      <div>Counter: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const AppWithMobx = observer(({ counter }) => {
  return (
    <div className="App">
      <div>Counter: {counter.count}</div>
      <div>
        <button onClick={() => counter.increment()}>+1</button>
        <button onClick={() => counter.decrement()}>-1</button>
        <button onClick={() => counter.reset()}>Reset</button>
      </div>
    </div>
  );
});

export default AppWithGlobalContext;
