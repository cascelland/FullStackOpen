import { useEffect, useState } from "react"

import countriesService from "./services/countries"
import weatherService from "./services/weather"
import Countries from "./components/Countries"

const App = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weather, setWeather] = useState(null)

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

  useEffect(() => {
    if (filteredCountries.length === 1) {
      weatherService
        .getWeather(filteredCountries[0].capital)
        .then(data => {
          setWeather(data)
        })
        .catch(error => {
          setWeather(null)
          console.log(error)
        })
    }

  }, [filteredCountries])

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
        <Countries countries={filteredCountries} handleShow={(name) => handleShow(name)} weather={weather} />
      }
    </div>
  )
}

export default App