import React, { useState } from "react";

function App() {
  const [nums, setNums] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://localhost:5000/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /* your data here */
        }),
      });

      const data = await response.json();
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Minimum Difference Calculator</h1>
      <label>
        Enter numbers (separated by commas):
        <input
          type="text"
          value={nums}
          onChange={(e) => setNums(e.target.value)}
        />
      </label>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <div>
          <h2>Result:</h2>
          <p>Minimum Difference: {result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
