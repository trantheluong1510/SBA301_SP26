import { useState } from "react";

function TestCount() {
  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Test Count</h2>
      <h3>Count: {count}</h3>

      <button onClick={handleCount}>Increase</button>
    </div>
  );
}

export default TestCount;
