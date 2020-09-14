import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
    <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.avg/props.all}</td>
          </tr>
          <tr>
            <td>good</td>
            <td>{(props.good/props.all)*100}</td>
            <td>%</td>
          </tr>
        </tbody>
      </table>
      </div>
  )
}
  /*
  <StatisticsLine text="good" value={props.good} />
  <StatisticsLine text="neutral" value={props.neutral} />
  <StatisticsLine text="bad" value={props.bad} />
  <StatisticsLine text="all" value={props.all} />
  <StatisticsLine text="average" value={props.avg/props.all} />
  <StatisticsLine text="positive" value={(props.good/props.all)*100} pros="%"/>
  */

const StatisticsLine = (props) => (
  <div>
    {props.text} {props.value} {props.pros}
  </div>
)

const App = () => {
  // tallennetaan napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)

  const addGood = () => {
    setAll(all + 1)
    setGood(good + 1)
    setAvg(avg + 1)
  }

  const addNeutral = newValue => {
    setAll(all + 1)
    setNeutral(newValue)
  }

  const addBad = newValue => {
    setAll(all + 1)
    setBad(newValue)
    setAvg(avg - 1)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text="good" />
      <Button handleClick={() => addNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => addBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

