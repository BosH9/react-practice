import { useState } from "react";

//Exercise 2
export default function CounterStep() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(5);

  return (
    <>
      <p>{count}</p>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <button onClick={() => setCount((prev) => prev + step)}>Increment</button>
      <button onClick={() => setCount((prev) => prev - step)}>Decrement</button>
      <button
        onClick={() => {
          setCount(0);
          setStep(5);
        }}
      >
        Reset
      </button>
    </>
  );
}
