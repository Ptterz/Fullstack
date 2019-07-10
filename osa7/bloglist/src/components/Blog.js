import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const [extended, setExtended] = useState(false)
  const toggleExtended = () => setExtended(!extended)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const checkCreds = () => {
    if (props.blog.user && props.blog.user.username === props.user.user) {
      return <button onClick={() => props.blogRemoval(props.blog.id)}>remove</button>
    }
    return null
  }

  if (!extended) {
    return (
      <div onClick={toggleExtended} style={blogStyle} className='header'>
        {props.blog.title} {props.blog.author}
      </div>
    )
  }

  return (
    <div style={blogStyle} className='extendedBlog'>
      <div onClick={toggleExtended}>
        {props.blog.title}, {props.blog.author}
      </div>
      <a href={props.blog.url}>
        {props.blog.url}
      </a>
      <div>
        {props.blog.likes} likes <button onClick={() => props.increaseLikes(props.blog)}>like</button>
      </div>
      <div>
        added by {props.blog.user.name}
      </div>
      {checkCreds()}
    </div>
  )
}

Blog.propTypes = {
  blogRemoval: PropTypes.func.isRequired,
  increaseLikes: PropTypes.func.isRequired
}

export default Blog