import { useState } from 'react'

const StatisticsLine = ({text, value, suffix}) => <tr><td>{text}</td><td>{value}{suffix}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const totalFeedback = good + neutral + bad
  const average = (good - bad) / totalFeedback
  const positive = (good / totalFeedback) * 100

    if(totalFeedback===0){
      return(
        <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </div>
      )
    }
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='good' value={good} suffix='' />
            <StatisticsLine text='neutral' value={neutral} suffix='' />
            <StatisticsLine text='bad' value={bad} suffix='' />
            <StatisticsLine text='all' value={totalFeedback} suffix='' />
            <StatisticsLine text='average' value={average} suffix='' />
            <StatisticsLine text='positive' value={positive} suffix='%' />
          </tbody>
        </table>
      </div>
    )
}

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handleClick={handleGoodClick} />
      <Button name='neutral' handleClick={handleNeutralClick} />
      <Button name='bad' handleClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App