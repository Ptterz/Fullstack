import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useField } from './hooks/index'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userCreds = await loginService.login({
        username: username.inputContent.value,
        password: password.inputContent.value,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(userCreds))
      blogService.setToken(userCreds.token)
      setUser(userCreds)
      username.reset()
      password.reset()
    } catch (error) {
      const data = {
        type: 'error',
        content: `${error.response.data.error}`
      }
      props.setNotification(data, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const getLoginForm = () => {
    if (user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            password={password}
          />
        </div>
      )
    }
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in.
          <button onClick={logout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <BlogList user={user} />
      </div>
    )
  }

  return (
    <div className="App">
      <Notification />
      {getLoginForm()}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs
}

export default connect(null, mapDispatchToProps)(App)