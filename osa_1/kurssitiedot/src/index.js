import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  const t = props.course.parts
  return (
    <div>
      <Part part={t[0].name} exercises={t[0].exercises} />
      <Part part={t[1].name} exercises={t[1].exercises} />
      <Part part={t[2].name} exercises={t[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  let summa = 0
  const t = props.course.parts
  t.forEach(part => {
    summa += part.exercises
  })
  return (
  <div>
    <p>Number of exercises {summa}</p>
  </div>)
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
