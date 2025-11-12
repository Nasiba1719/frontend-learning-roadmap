import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);


  const getColor = () => {
    if (count > 0) return "#2d6a4f"; 
    if (count < 0) return "#d00000"; 
    return "#1d3557"; 
  };

  return (
    <div classname = "container">
    <div className="counter-container">
      <h2 className="title">Counter</h2>
      <h1
        key={count} 
        className="count bounce"
        style={{ color: getColor() }}
      >
        {count}
      </h1>

      <div className="buttons">
        <button onClick={() => setCount(count + 1)}>➕ Artır</button>
        <button onClick={() => setCount(count - 1)}>➖ Azalt</button>
        <button onClick={() => setCount(0)}>🔁 Sıfırla</button>
      </div>
    </div>
      </div>
  );

}


export default Counter;
