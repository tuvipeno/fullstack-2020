import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  // const points = new Array(anecdotes.length).fill(0) // Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0)
  
  const changeValue = () => {
    let anecValue = Math.floor(Math.random()*props.anecdotes.length)
    if (anecValue !== selected) setSelected(anecValue)
    else changeValue()
  }

  const changeVotes = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
    if (copy[selected] > points[mostVoted]) setMostVoted(selected)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <Button handleClick={changeVotes} text="vote"></Button>
        <Button handleClick={changeValue} text="next anecdote"></Button>
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[mostVoted]}</div>
      <div>has {points[mostVoted]} votes</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
  document.getElementById('root')
);