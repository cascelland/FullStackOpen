import { useEffect, useState } from "react"

import countriesService from "./services/countries"

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1 && countries.length <= 10) {
    return (
      <div>
        {countries.map(c => <p key={c.name.common}>{c.name.common}</p>)}
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
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
    setSearchFilter(event.target.value)
  }

  const filteredCountries = searchFilter !== ""
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchFilter.toLowerCase()))
    : countries

  return (
    <div>
      find countries <input
        value={searchFilter}
        onChange={handleSearchFilter}
      />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App