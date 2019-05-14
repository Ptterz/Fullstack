import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Feedback = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGoodClick = (value) => setGood(value)
    const handleNeutralClick = (value) => setNeutral(value)
    const handleBadClick = (value) => setBad(value)

    return (
        <div>
            <h1>Anna palautetta</h1>
            <Button handleClick={() => handleGoodClick(good + 1)} text='hyvä' />
            <Button handleClick={() => handleNeutralClick(neutral + 1)} text='neutraali' />
            <Button handleClick={() => handleBadClick(bad + 1)} text='huono' />
            <h2>Tilasto</h2>
            <Table good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value, text2 }) => <div><p>{text} {value} {text2}</p></div>

const Statistics = ({ good, neutral, bad }) => {
    if ((good + neutral + bad) === 0) {
        return <div>Ei yhtään palautetta annettu</div>
    }
    return (
        <div>
            <Statistic text='hyvä' value={good} />
            <Statistic text='neutraali' value={neutral} />
            <Statistic text='huono' value={bad} />
            <Statistic text='yhteensä' value={good + neutral + bad} />
            <Statistic text='keskiarvo' value={(good - bad) / (good + neutral + bad)} />
            <Statistic text='positivisia' value={(good / (good + neutral + bad)) * 100} text2='%' />
        </div>
    )
}

const Table = ({ good, neutral, bad }) => {
    if ((good + neutral + bad) === 0) {
        return <div>Ei yhtään palautetta annettu</div>
    }
    return (
        <table cellPadding={5}>
            <tbody>
                <tr>
                    <td>hyvä</td>
                    <td>{good}</td>
                </tr>
                <tr>
                    <td>neutraali</td>
                    <td>{neutral}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{bad}</td>
                </tr>
                <tr>
                    <td>yhteensä</td>
                    <td>{good + neutral + bad}</td>
                </tr>
                <tr>
                    <td>keskiarvo</td>
                    <td>{(good - bad) / (good + neutral + bad)}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{(good / (good + neutral + bad)) * 100} %</td>
                </tr>
            </tbody>
        </table>
    )
}

ReactDOM.render(<Feedback />, document.getElementById('root'))