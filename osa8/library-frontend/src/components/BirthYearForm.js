import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS } from '../requests/queries'

const BirthYearForm = (props) => {
    const [year, setYear] = useState('')
    const [selected, setSelected] = useState('none')
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        props.client.query({
            query: ALL_AUTHORS
        }).then(response => setAuthors(authors.concat(response.data.allAuthors)))
    }, [])

    if (!props.show) {
        return null
    }

    const handleChange = (event) => {
        setSelected(event.target.value)
    }

    const submit = async (event) => {
        event.preventDefault()

        await props.editAuthor({
            variables: { name: selected, setBornTo: Number(year) }
        })

        setYear('')
        setSelected('none')
    }

    const getAuthors = () => {
        if (authors.length === 0 || authors === undefined) {
            return null
        }
        return authors.map(a => <option key={a.name}>{a.name}</option>)
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <label>
                    Select author
                    <select value={selected} onChange={handleChange}>
                        <option key={'none'}>none</option>
                        {getAuthors()}
                    </select>
                </label>
                <div>
                    Year
                    <input
                        value={year}
                        onChange={({ target }) => setYear(target.value)}
                    />
                </div>
                <button type='submit'>Update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm