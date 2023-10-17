import { useState } from 'react'

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((average + 1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((average + 0))
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage((average - 1))
  }

  const positivePercentage = ((good * 100) / all)




  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} name={"good"} />
      <Button handleClick={handleNeutral} name={"neutral"} />
      <Button handleClick={handleBad} name={"bad"} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average / all}</p>
      <p>positive {positivePercentage} %</p>
    </div>
  )
}

export default App