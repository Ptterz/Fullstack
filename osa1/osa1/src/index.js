import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Hello = ({ name, age }) => {

    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old.</p>
            <p>So you are propably born in {bornYear()}</p>
        </div>
    )
}

const App = () => {
    const nimi = 'Pekka'
    const ika = 10

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Arto" age={26 + 10} />
            <Hello name={nimi} age={ika} />
        </div>
    )
}

//ReactDOM.render(<App />, document.getElementById('root'))

const Appen = (props) => {
    const [counter, setCounter] = useState(0)
    const setToValue = (value) => setCounter(value)

    return (
        <div>
            <Display counter={counter} />
            <Button
                handleClick={() => setToValue(counter + 1)}
                text='plus'
            />
            <Button
                handleClick={() => setToValue(counter - 1)}
                text='minus'
            />
            <Button
                handleClick={() => setToValue(0)}
                text='zero'
            />
        </div>
    )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

// ReactDOM.render(
//     <Appen />,
//     document.getElementById('root')
// )

const App2 = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            <div>
                {left}
                <Button handleClick={handleLeftClick} text='vasen' />
                <Button handleClick={handleRightClick} text='oikea' />
                {right}
                <History allClicks={allClicks} />
            </div>
        </div>
    )
}

const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return <div> sovellusta käytetään nappeja painamalla </div>
    }
    return <div> näppäilyhistoria : {allClicks.join(' ')} </div>
}

//ReactDOM.render(<App2 />, document.getElementById('root'))

const App3 = (props) => {
    const [value, setValue] = useState(10)
    const setToValue = (newValue) => {
        setValue(newValue)
    }


    return (
        <div>
            {value}
            <button onClick={() => setToValue(1000)}> tuhat </button>
            <button onClick={() => setToValue(0)}> nollaa </button>
            <button onClick={() => setToValue(value + 1)}> kasvata </button>
        </div>
    )
}

ReactDOM.render(
    <App3 />,
    document.getElementById('root')
)