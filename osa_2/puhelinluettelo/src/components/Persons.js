import React from 'react'

const Persons = ({ person, deleteContact }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deleteContact}>delete</button>
    </li>
  )
}

// const Persons = (props) => {
  //return (
    //  props.shown.map(person =>
      //  <p key={person.name}> {person.name} {person.number}
        //<button onClick={props.deleteContact}>delete</button></p>
      //)
  //)
//}

export default Persons