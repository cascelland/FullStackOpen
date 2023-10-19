import { useEffect, useState } from 'react'
import axios from "axios"

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')


  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [])

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
      axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setFilteredPersons(persons.concat(response.data))
      })
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
        persons={persons}
      />
    </div>
  )
}

export default App