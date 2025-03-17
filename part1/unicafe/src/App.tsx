import React from 'react';
import logo from './logo.svg';
const Options = () => {
  const [good, setGood] = React.useState(0);
  const [neutral, setNeutral] = React.useState(0);
  const [bad, setBad] = React.useState(0);
  return (
    <div>
      <button onClick={() => setGood(good + 1)} value={good}>good</button>
      <button onClick={() => setNeutral(neutral + 1)} value={neutral}>neutral</button>
      <button onClick={() => setBad(bad + 1)} value={bad}>bad</button>
      <div>
        <p>good: {good}</p>
        <p>neutral {neutral}</p>
        <p>bad  {bad}</p>
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
