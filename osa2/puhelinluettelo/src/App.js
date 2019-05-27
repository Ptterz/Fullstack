import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PhoneBook from './components/PhoneBook'
import PersonForm from './components/PersonForm'
import service from './services/PhoneBookService'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        service
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const updateNewName = (event) => {
        setNewName(event.target.value)
    }

    const updateNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const updateFilter = (event) => {
        setFilter(event.target.value)
    }

    const personsToShow = persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    )

    const updatePerson = (personObject) => {
        window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`)
            ? service
                .updatePerson(personObject)
                .then(response => {
                    setPersons(persons.map(person => person.id !== personObject.id ? person : response))
                    setNotification({
                        content: `${personObject.name} päivitetty onnistuneesti`,
                        type: 'notification'
                    })
                    setNewName('')
                    setNewNumber('')
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setNotification({
                        content: `${personObject.name} päivitys epäonnistui`,
                        type: 'error'
                    })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
            : console.log('Cancel')
    }

    const createPerson = () => {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        service
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                setNotification({
                    content: `${returnedPerson.name} lisätty onnistuneesti`,
                    type: 'notification'
                })
                setNewName('')
                setNewNumber('')
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
            .catch(error => {
                setNotification({
                    content: `${newPerson.name} lisäys epäonnistui`,
                    type: 'error'
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const addNewPerson = (event) => {
        event.preventDefault()
        const personExists = persons.find(person => person.name === newName)
        const changedPerson = { ...personExists, number: newNumber }

        personExists !== undefined
            ? updatePerson(changedPerson)
            : createPerson()
    }

    const deletePerson = person => {
        window.confirm(`Poistetaanko ${person.name}?`)
            ? service
                .deletePerson(person.id)
                .then(response => {
                    setPersons(persons.filter(p => person.id !== p.id))
                    setNotification({
                        content: `${person.name} poistettu onnistuneesti`,
                        type: 'notification'
                    })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
                .catch(error => {
                    setPersons(persons.filter(p => person.id !== p.id))
                    setNotification({
                        content: `${person.name} on jo poistettu`,
                        type: 'error'
                    })
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
            : console.log('Cancel')
    }

    const entries = () => {
        return (
            <div>
                <table>
                    <tbody>
                        {personsToShow.map(person => (
                            <PhoneBook
                                key={person.name}
                                person={person}
                                deletePerson={() => deletePerson(person)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <Notification message={notification} />
            <Filter filter={filter} updateFilter={updateFilter} />
            <h2>Lisää uusi henkilö</h2>
            <PersonForm
                addNewPerson={addNewPerson}
                newName={newName}
                newNumber={newNumber}
                updateNewName={updateNewName}
                updateNewNumber={updateNewNumber}
            />
            <h2>Numerot</h2>
            {persons.length === 0
                ? <p>Ladataan tietoja</p>
                : entries()
            }
        </div>
    )
}

export default App