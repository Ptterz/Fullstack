import React, { useState } from 'react'
import { CREATE_USER } from '../requests/queries'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)

    if (!props.show) {
        return null
    }

    const toggleVisibility = () => {
        setVisible(!visible)
        setUsername('')
        setPassword('')
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const submitLogin = async (event) => {
        event.preventDefault()

        const result = await props.login({
            variables: { username, password }
        })

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('loggedInUser', token)
            props.setPage()
        }
    }

    const createAccount = async (event) => {
        event.preventDefault()
        props.client.mutate({
            mutation: CREATE_USER, variables: { username, favoriteGenre: password }
        }).then(response => toggleVisibility)
        toggleVisibility()
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <h2>Login</h2>
                <form onSubmit={submitLogin}>
                    <div>
                        username
                        <input
                            type='text'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type='password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>login</button>
                </form>
                <button onClick={toggleVisibility}>create account</button>
            </div>
            <div style={showWhenVisible}>
                <h2>Create account</h2>
                <form onSubmit={createAccount}>
                    <div>
                        username
                        <input
                            type='text'
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        favorite genre
                        <input
                            type='text'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type='submit'>create</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm