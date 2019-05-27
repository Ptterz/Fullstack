import React from 'react'

const PhoneBook = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button type="button" onClick={deletePerson}>poista</button></td>
        </tr>
    )
}

export default PhoneBook