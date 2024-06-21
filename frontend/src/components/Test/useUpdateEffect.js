import React, { useState, createContext, useContext } from "react";

import { useEffect, useRef } from "react";

function useUpdateEffect(callback, dependencies) {
  // useRef does not rerender when the .current property changes. Using state triggers a rerender which isn't optimal.
  const firstRender = useRef(true);
  console.log(firstRender);
  //   useEffect runs on first component mount and subsequent renders/ dependency array
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      return callback();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

export default function Increment() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1); // Correct way to update state based on previous state
  };

  useUpdateEffect(() => {
    console.log(`Component rendered, count: ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>click</button>
    </div>
  );
}
