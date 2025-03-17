import { useState, useEffect } from 'react';
const Options = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  useEffect(() => {
    setAll(good + neutral + bad);
    if (all > 0) {
      setAverage((good - bad) / all);
      setPositive(good / all * 100);
    }
  }, [good, neutral, bad, average, positive, all]);

  console.log("all", all);

  return (
    <div>
      <button onClick={() => setGood(good + 1)} value={good}>good</button>
      <button onClick={() => setNeutral(neutral + 1)} value={neutral}>neutral</button>
      <button onClick={() => setBad(bad + 1)} value={bad}>bad</button>
      <div>
        <p>good: {good}</p>
        <p>neutral {neutral}</p>
        <p>bad  {bad}</p>
        <p>all  {all};</p>
        <p>average  {average}</p>
        <p>positive  {positive} %</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Options></Options>
    </div>
  );
}

export default App;
