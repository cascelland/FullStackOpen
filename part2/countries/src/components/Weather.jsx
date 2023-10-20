const Weather = (props) => {
  return (
    <div>
      <h1>Weather in {props.weather.name}</h1>
      <p>temperature {props.weather.main.temp_min} celsius</p>
      <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt="" />
      <p>wind {props.weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
