import { useState } from 'react'

const getRandomInt = max => Math.floor(Math.random() * max)
const getMaxIndex = arr => arr.indexOf(Math.max(...arr))

const Anecdote = ({anecdote, votes}) => {
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const max = anecdotes.length
  const [selected, setSelected] = useState(getRandomInt(max))
  const [votes, setVotes] = useState(Array(max).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNewAnecdote = () => setSelected(getRandomInt(max))

  const handleVote = (selected) => {
    // Update votes
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    // Update most votes
    setMostVotes(getMaxIndex(newVotes))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleNewAnecdote} text="new anecdote" />
      <Button onClick={() => handleVote(selected)} text="vote" />
      <h1>Anecdote with the most votes</h1>
      <Anecdote anecdote={anecdotes[mostVotes]} votes={votes[mostVotes]} />
    </div>
  )
}

export default App
