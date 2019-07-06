import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addNewOne = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNew(content)
        props.setNotification(`Added '${content}'`, 5000)
    }

    return (
        <form onSubmit={addNewOne}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

const mapDispatchToProps = {
    createNew,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)