import { useState } from 'react'

const Button = ({ handleClick, name }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({ good, neutral, bad, stats }) => {

  if (stats.all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {stats.all}</p>
      <p>average {stats.average / stats.all}</p>
      <p>positive {(good * 100) / stats.all} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [stats, setStatistics] = useState({
    all: 0,
    average: 0,
  })

  const handleGood = () => {
    setGood(good + 1)
    setStatistics({
      all: stats.all + 1,
      average: stats.average + 1,
    })
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setStatistics({
      ...stats,
      all: stats.all + 1,
    })
  }

  const handleBad = () => {
    setBad(bad + 1)
    setStatistics({
      all: stats.all + 1,
      average: stats.average - 1,
    })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} name={"good"} />
      <Button handleClick={handleNeutral} name={"neutral"} />
      <Button handleClick={handleBad} name={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} stats={stats} />
    </div>
  )
}

export default App