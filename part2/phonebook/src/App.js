import {useState, useEffect} from 'react'
import axios from 'axios'
import './index.css'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type.concat('-notification')}>
        {message.notification}
    </div>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const Persons = ({persons, filter, handleDelete}) => {
  const filterPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const newPersons = filterPersons()  
  
  return (
    newPersons.map(person =>
      <div key={person.name}>
        <p>
        {person.name}
        {person.number}
        <button onClick={() => handleDelete(person.id)}>Delete Person</button>
        </p>
      </div>
      )
  )
}

const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleAdd}) => {
  return (
    <form>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button onClick={handleAdd} type="submit">add</button>
      </div>
    </form>
  )
}  

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const getPersons = () => {
    personService.getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
  }

  useEffect(getPersons, [])

  // It could be best to move these handlers to the child components.  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleAdd = (event) => {
    event.preventDefault()

    // we assume only 1 person per name
    const existingPerson = persons.filter(person => person.name === newName)[0]

    const person = {
      name: newName,
      number: newNumber
    }

    if (existingPerson) {
      let newPersons = persons.filter(person => person.name !== newName)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        personService
          .update(existingPerson.id, person)
          .then(returnedPerson => {
            setPersons(newPersons.concat(returnedPerson).sort((a, b) => a.id < b.id ? -1 : 1))
            setNewName('')
            setNewNumber('')
            setNotification({notification: `Updated ${returnedPerson.name}`, type:'update'})
            setTimeout(() => {
              setNotification(null)
            }, 4000)
          })
          .catch(error => {
            setNotification({notification: `Information of ${existingPerson.name} has been removed from the server`, type:'delete'})
            setTimeout(() => {
              setNotification(null)
            }, 4000)
            setPersons(persons.filter(p => p.name !== existingPerson.name))
          })
      }
    } else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({notification: `Added ${returnedPerson.name}`, type:'create'})
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
        .catch(error => {
          setNotification({'notification': `${error.response.data.error}`, type:'delete'})
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)

    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotification({notification: `Deleted ${person.name}`, type:'delete'})
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type />
      <Filter 
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAdd={handleAdd}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
