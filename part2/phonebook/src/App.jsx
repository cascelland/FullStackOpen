import { useState } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const [filteredPersons, setFilteredPersons] = useState([...persons])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName("")
    } else if (newName != "") {
      setPersons(persons.concat(newPerson))
      setFilteredPersons(persons.concat(newPerson))
      setNewName("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFilter = (event) => {
    setSearchFilter(event.target.value)
    if (event.target.value != "") {
      setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    } else {
      setFilteredPersons(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchFilter={searchFilter}
        handleSearchFilter={handleSearchFilter}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={filteredPersons}
      />
    </div>
  )
}

export default App