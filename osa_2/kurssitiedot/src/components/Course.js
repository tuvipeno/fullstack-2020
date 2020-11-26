import React from 'react'

const Course = (props) => {
    const parts = props.course.parts
    const all = parts.reduce( (s, p) => s + p.exercises, 0)
    return (
      <div>
        <h3>{props.course.name}</h3>
        <div>
          {parts.map(part => 
            <p key={part.id}>
              {part.name} {part.exercises}
            </p>
          )}
        </div>
        <div>
          <strong>Total of {all} exercises</strong>
        </div>
      </div>
    )
  }
  
  export default Course