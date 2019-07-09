import React, { useState, useEffect } from 'react'
import { useField } from './hooks/index'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  //const [blogs, blogService] = useResource('/api/blogs')
  const blogFormRef = React.createRef()

  // useEffect(() => {
  //   blogService
  //     .getAll()
  //     .then(initialBlogs => blogService.setResources(initialBlogs))
  // }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
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
      getError(error)
    }
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.inputContent.value,
        author: author.inputContent.value,
        url: url.inputContent.value,
      }
      blogFormRef.current.toggleVisibility()
      const responseBlog = await blogService.create(newBlog)
      setNotification({
        type: 'notification',
        content: `A new blog ${responseBlog.title} by ${responseBlog.author} added!`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      // blogService.setResources(blogs.concat(responseBlog))
      setBlogs(blogs.concat(responseBlog))
      title.reset()
      author.reset()
      url.reset()
    } catch (error) {
      getError(error)
    }
  }

  const increaseLikes = async (id) => {
    const foundBlog = blogs.find(b => b.id === id)
    const requestBlog = {
      ...foundBlog,
      likes: foundBlog.likes + 1,
      user: foundBlog.user.id,
    }
    try {
      const responseBlog = await blogService.update(requestBlog, id)
      blogs.find(b => b.id === responseBlog.id).likes = responseBlog.likes
      setNotification({
        type: 'notification',
        content: `Your like for the blog '${responseBlog.title} by ${responseBlog.author}' has been added!`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      getError(error)
    }
  }

  const removeBlog = async (id) => {
    const foundBlog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove the blog ${foundBlog.title} by ${foundBlog.author}?`)) {
      try {
        await blogService.deletion(id)
        // blogService.setResources(blogs.filter(blog => blog.id !== id))
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification({
          type: 'notification',
          content: `The blog ${foundBlog.title} by ${foundBlog.author} has been removed successfully!`
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      } catch (error) {
        getError(error)
      }
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const getError = (error) => {
    setNotification({
      type: 'error',
      content: `${error.response.data.error}`
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const getBlogRows = () => {
    const sortedBlogs = blogs.sort((bA, bB) => bB.likes - bA.likes)
    return (
      sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} increaseLikes={increaseLikes} removeBlog={removeBlog} />
      )
    )
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
          <BlogForm
            createBlog={createBlog}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
        {getBlogRows()}
      </div>
    )
  }

  return (
    <div className="App">
      <Notification message={notification} />
      {getLoginForm()}
    </div>
  )
}

export default App
