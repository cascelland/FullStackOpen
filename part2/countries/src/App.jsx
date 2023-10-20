import { useEffect, useState } from "react"

import countriesService from "./services/countries"

const Countries = (props) => {
  if (props.countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (props.countries.length > 1 && props.countries.length <= 10) {
    return (
      <div>
        {props.countries.map(c =>
          <p key={c.cca2}>{c.name.common} <button onClick={() => props.handleShow(c.name.common)}>show</button></p>
        )}
      </div>
    )
  }

  if (props.countries.length === 1) {
    return (
      <Country country={props.countries[0]} />
    )
  }
}

const Country = ({ country }) => {
  const languageKeys = Object.keys(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {languageKeys.map(k => <li key={k}>{country.languages[k]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.commmon}`} />
    </div>
  )
}

const App = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error =>
        console.log(error)
      )
  }, [])

  const handleSearchFilter = (event) => {
    const filtered = event.target.value !== ""
      ? countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
      : countries

    setSearchFilter(event.target.value)
    setFilteredCountries(filtered)
  }

  const handleShow = name => {
    const country = countries.find(c => c.name.common === name)
    setFilteredCountries([country])
  }

  return (
    <div>
      find countries <input
        value={searchFilter}
        onChange={handleSearchFilter}
      />
      {searchFilter != "" &&
        <Countries countries={filteredCountries} handleShow={(name) => handleShow(name)} />
      }
    </div>
  )
}

export default App