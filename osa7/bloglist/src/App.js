import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = (props) => {
  const blogFormRef = React.createRef()

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userById = (id) => {
    const foundUser = props.users.find(u => u.id === id)
    return foundUser
  }

  const blogById = (id) => {
    const foundBlog = props.blogs.find(u => u.id === id)
    return foundBlog
  }

  const getLoginForm = () => {
    if (props.user === null) {
      return (
        <div>
          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      )
    }
    return (
      <div>
        <Router>
          <Navigation user={props.user} logout={logout} />
          <Route exact path='/users' render={() => <Users />} />
          <Route exact path='/users/:id' render={({ match }) =>
            <User usr={userById(match.params.id)} />
          } />
          <Route exact path='/blogs/:id' render={({ match }) =>
            <Blog blog={blogById(match.params.id)} />
          } />
          <Route exact path='/' render={() => getBlogView()} />
        </Router>
      </div>
    )
  }

  const getBlogView = () => (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  )

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    props.setUser(null)
  }

  return (
    <div class="container">
      <Notification />
      {getLoginForm()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUsers,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)