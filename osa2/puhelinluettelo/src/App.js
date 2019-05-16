import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', id: 1, }
    ])
    const [newName, setNewName] = useState('')

    const rows = () => persons.map(person => <p key={person.id}>{person.name}</p>)

    const updateNewName = (event) => {
        setNewName(event.target.value)
    }

    const addNewName = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1,
        }
        var names = persons.map(person => person.name)
        names = names.includes(newName)
        ? window.alert('Warning!')
        : setPersons(persons.concat(personObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form onSubmit={addNewName}>
                <div>
                    nimi: 
                    <input 
                        value={newName}
                        onChange={updateNewName}
                    />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
            <h2>Numerot</h2>
            {rows()}
        </div>
    )
}

export default App