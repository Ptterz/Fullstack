import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userCreds = await loginService.login({
        username: event.target.elements.usernameInput.value,
        password: event.target.elements.passwordInput.value,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(userCreds))
      blogService.setToken(userCreds.token)
      props.setUser(userCreds)
    } catch (error) {
      const data = {
        type: 'error',
        content: `${error.response.data.error}`
      }
      props.setNotification(data, 5000)
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId='usernameInput'>
        <Form.Label>Username:</Form.Label>
        <Form.Control type='text' name='username' placeholder='Enter username' />
      </Form.Group>
      <Form.Group controlId='passwordInput'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type='password' name='password' placeholder='Enter password' />
      </Form.Group>
      <Form.Group>
        <Button variant='primary' type="submit" style={{ marginRight: 5 }}>
          Login
        </Button>
      </Form.Group>
    </Form>
  )
}

const mapDispatchToProps = {
  setUser,
  setNotification
}

export default connect(null, mapDispatchToProps)(LoginForm)