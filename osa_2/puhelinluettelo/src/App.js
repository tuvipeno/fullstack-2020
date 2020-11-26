import React, {useState, useEffect} from 'react';
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import noteService from './services/notes'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [shown, setShown] = useState(persons)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setShown(response.data)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const p = persons.find(person => person.name === newName)
    const n = persons.find(person=> person.number === newNumber)
    if (p !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return handleUpdate(p, newNumber)
        
      }
    }
    if (n !== undefined) return (
      window.alert(`${newNumber} is already added to phonebook`)
    )
    // if (persons.findIndex(person => person.name === newName) >= 0)
      // return (
         // window.alert(`${newName} is already added to phonebook`)
      //)
    //if (persons.findIndex(person => person.number === newNumber) >= 0)
    //return (
    //    window.alert(`${newNumber} is already added to phonebook`)
    //   )
    const person = {
        name: newName,
        number: newNumber
    }

    noteService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setShown(shown.concat(response.data))
        setNewName('')
        setNewNumber('')

        setNotification(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }

  const handleNewName = (event) => {
      // console.log(event.target.value)
      setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
      setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
      setShown(
        persons.filter(
          person => person.name.toLowerCase().includes(
            event.target.value.toLowerCase()
          )
        )
      )
  }

  const handleUpdate = (p, newNumber) => {
    const changedContact = {...p, number: newNumber}

    noteService
      .update(p.id, changedContact)
      .then(returnedContact => {
        setPersons(persons.map(person => person.id !== p.id ? person : returnedContact))
        setShown(persons.map(person => person.id !== p.id ? person : returnedContact))
        setNewName('')
        setNewNumber('')

        setErrorMessage(
          `Number updated for ${p.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `the person '${p.name}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setShown(persons.filter(person => person.id !== p.id))
      })
      
  }
  
  const handleDelete = (id, name) => {
    console.log(persons)
    if (window.confirm(`Delete ${name}?`))
      noteService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setShown(persons.filter(person => person.id !== id))
          setNotification(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }) 
  }

  const Error = ({ message }) => {
    const errorStyle = {
      color: 'red',
      fontSize: 28,
      backgroundColor: 'lightgrey',
      borderStyle: 'solid',
      borderColor: 'red',
      paddingLeft: 5,
      marginBottom: 5
    }

    if (message === null) {
      return null
    }

    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }

  const Notification = ({ message }) => {
    const notificationStyle = {
      color: 'green',
      fontSize: 28,
      backgroundColor: 'lightgrey',
      borderStyle: 'solid',
      borderColor: 'green',
      paddingLeft: 5,
      marginBottom: 5
    }

    if (message === null) {
      return null
    }

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter handleFilter={handleFilter}/>

      <h3>Add a new</h3>
      <PersonForm 
        submit={addName}
        name={newName}
        changeName={handleNewName}
        number={newNumber}
        changeNumber={handleNewNumber}
      />

      <h3>Numbers</h3>
      <ul>
        {shown.map((person, i) =>
          <Persons 
            key={i}
            person={person}
            deleteContact={() => handleDelete(person.id, person.name)}
          />
        )}
      </ul>
      
    </div>
  )

}

export default App
 