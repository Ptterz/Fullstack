import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import CommentForm from './CommentForm'
import Button from 'react-bootstrap/Button'

const Blog = (props) => {
  const increaseLikes = (blog) => {
    props.likeBlog(blog)
    const data = {
      type: 'notification',
      content: `Your like for the blog '${blog.title}' by '${blog.author}' has beed registered!`
    }
    props.setNotification(data, 5000)
  }

  const blogRemoval = id => {
    const foundBlog = props.blogs.find(b => b.id === id)
    if (window.confirm(`Remove the blog ${foundBlog.title} by ${foundBlog.author}?`)) {
      props.removeBlog(id)
      const data = {
        type: 'notification',
        content: `The blog '${foundBlog.title}' by '${foundBlog.author}' has been removed successfully!`
      }
      props.setNotification(data, 5000)
    }
  }

  const checkCreds = () => {
    if (props.blog.user && props.blog.user.username === props.user.user) {
      return <Button onClick={() => blogRemoval(props.blog.id)} data-cy='blogRemovalButton'>remove</Button>
    }
    return null
  }

  if (props.blog === undefined) {
    return (
      <Redirect to='/' />
    )
  }

  const getComments = (blog) => {
    const comments = blog.comments
    if (comments === undefined) {
      return <div>Comments are disabled!</div>
    } else if (comments.length === 0) {
      return <div>Be the first to comment!</div>
    }

    return (comments.map(comment => <li key={comment.id}>{comment.content}</li>))
  }

  return (
    <div>
      <h2>
        {props.blog.title}, {props.blog.author}
      </h2>
      <a href={props.blog.url}>
        {props.blog.url}
      </a>
      <div>
        {props.blog.likes} likes <Button onClick={() => increaseLikes(props.blog)}>like</Button>
      </div>
      <div>
        added by {props.blog.user.name}
      </div>
      {checkCreds()}
      <h3>Comments</h3>
      <CommentForm blog={props.blog} />
      <ul>
        {getComments(props.blog)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    blogs: state.blogs,
    user: state.user,
    blog: ownProps.blog
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)