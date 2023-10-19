import { useEffect, useState } from 'react'
import personsService from "./services/persons"

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, replace the number?`)) {
        const id = persons.find(person => person.name === newName).id
        personsService
          .update(id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
          })
          .then(() => {
            setNewName("")
            setNewNumber("")
            setErrorMessage(`Updated ${newPerson.name}`)
            setTimeout(() => {
              setErrorMessage('')
            }, 5000);
          })
      }
    } else if (newName !== "") {
      personsService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        .then(() => {
          setNewName("")
          setNewNumber("")
          setErrorMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setErrorMessage('')
          }, 5000);
        })
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
  }

  const handleDelete = id => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() =>
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  const filteredPersons = searchFilter !== ""
    ? persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
        handleDelete={(id) => handleDelete(id)}
      />
    </div>
  )
}

export default App