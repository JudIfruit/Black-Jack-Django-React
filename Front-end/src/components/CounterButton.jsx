import { useState } from 'react';

export default function CounterButton({ name }) {
  const [count, setCount] = useState(0);

  return (
    <button className="button" onClick={() => setCount(count + 1)}>
        {name} Clicked {count} times
    </button>
  );
}