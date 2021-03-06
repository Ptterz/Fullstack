import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const setIndex = (value) => setSelected(value)
    var count = votes[selected]
    var max = Math.max(...votes)
    console.log(votes)

    const next = () => {
        setIndex(random)
    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <p>The anecdote has {count} votes.</p>
            <p>
                <button onClick={() => votes[selected] += 1}> {'Vote'}</button>
                <button onClick={next}> {'Next anecdote'}</button>
            </p>
            <h2>Anecdote with most votes</h2>
            {props.anecdotes[votes.indexOf(max)]}
            <p>The anecdote has {max} votes.</p>
        </div>
    )
}

var random = () => Math.floor(Math.random() * anecdotes.length)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

var votes = new Array(anecdotes.length).fill(0)

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)