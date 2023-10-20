import Weather from "./Weather"

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
      <div>
        <Country country={props.countries[0]} />
        {props.weather != null &&
          <Weather weather={props.weather} />
        }
      </div>
    )
  }
}

const Country = ({ country }) => {
  const languageKeys = Object.keys(country.languages);

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

export default Countries
