import {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const Persons = ({persons, filter}) => {
  const filterPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const newPersons = filterPersons()  
  
  return (
    newPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
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

  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

    const isInArray = persons.filter(person => person.name === newName).length > 0

    if(isInArray){
      window.alert(`${newName} is already added to phonebook.`)
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )
}

export default App
