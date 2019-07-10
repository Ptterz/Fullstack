import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
  const sortedBlogs = props.blogs.sort((bA, bB) => bB.likes - bA.likes)

  const increaseLikes = (blog) => {
    try {
      props.likeBlog(blog)
      const data = {
        type: 'notification',
        content: `Your like for the blog '${blog.title}' by '${blog.author}' has beed registered!`
      }
      props.setNotification(data, 5000)
    } catch (error) {
      const data = {
        type: 'error',
        content: `${error.response.data.error}`
      }
      props.setNotification(data, 5000)
    }
  }

  const blogRemoval = id => {
    const foundBlog = props.blogs.find(b => b.id === id)
    if (window.confirm(`Remove the blog ${foundBlog.title} by ${foundBlog.author}?`)) {
      try {
        props.removeBlog(id)
        const data = {
          type: 'notification',
          content: `The blog '${foundBlog.title}' by '${foundBlog.author}' has been removed successfully!`
        }
        props.setNotification(data, 5000)
      } catch (error) {
        const data = {
          type: 'error',
          content: `${error.response.data.error}`
        }
        props.setNotification(data, 5000)
      }
    }
  }

  return (
    sortedBlogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={props.user} increaseLikes={increaseLikes} blogRemoval={blogRemoval} />
    )
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)