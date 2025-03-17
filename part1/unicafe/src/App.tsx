import { useState, useEffect } from 'react';
const Statistics = ({ good, neutral, bad, all, average, positive }: { good: number, neutral: number, bad: number, all: number, average: number, positive: number }) => {

  return (
    <div>
      <b>statistics</b>
      {all === 0 ? <p>No feedback given</p> :
        <div>
          <p>good: {good}</p>
          <p>neutral {neutral}</p>
          <p>bad  {bad}</p>
          <p>all  {all};</p>
          <p>average  {average}</p>
          <p>positive  {positive} %</p>
        </div>
      }
    </div>
  );
}

function App() {
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
      setPositive((good / all) * 100);
    }
  }, [good, neutral, bad, average, positive, all]);
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selectedAnecdote, setSelectedAnecdote] = useState(0);
  const [randomNum, setRandom] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  function vote() {
    const newVotes = [...votes];
    newVotes[selectedAnecdote] += 1;
    setVotes(newVotes);
    console.log(votes);
    console.log("anecdote",selectedAnecdote);
  }
  console.log(votes);
  function getRandom(){
    setRandom(Math.floor(Math.random() * anecdotes.length));
    return randomNum;
  }
  return (
    <div className="App">
      <b>give feedback</b> <br />
      <button onClick={() => setGood(good + 1)} value={good}>good</button>
      <button onClick={() => setNeutral(neutral + 1)} value={neutral}>neutral</button>
      <button onClick={() => setBad(bad + 1)} value={bad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}></Statistics>

      <button onClick={() => setSelectedAnecdote(getRandom())}>next anecdote</button>
      <p>{anecdotes[selectedAnecdote]} {votes[selectedAnecdote]}</p>
      <button onClick={() => vote()}>vote</button>
      <p><b>Anectode with most votes:</b>"{anecdotes[votes.indexOf(Math.max(...votes))]}" With {Math.max(...votes)} votes!</p>
    </div>
  );
}

export default App;
