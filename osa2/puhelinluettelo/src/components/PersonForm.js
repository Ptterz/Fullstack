import React from 'react'

const PersonForm = ({ addNewPerson, updateNewName, updateNewNumber, newName, newNumber }) => (
    <form onSubmit={addNewPerson}>
        <div>
            nimi:
            <input
                value={newName}
                onChange={updateNewName}
            />
        </div>
        <div>
            numero:
            <input
                value={newNumber}
                onChange={updateNewNumber}
            />
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
)

export default PersonForm