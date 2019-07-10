import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks/index'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.inputContent.value,
        author: author.inputContent.value,
        url: url.inputContent.value,
      }
      props.addBlog(newBlog)
      props.blogFormRef.current.toggleVisibility()
      const data = {
        type: 'notification',
        content: `A new blog '${newBlog.title}' by '${newBlog.author}' added!`
      }
      props.setNotification(data, 5000)
      title.reset()
      author.reset()
      url.reset()
    } catch (error) {
      const data = {
        type: 'error',
        content: `${error.response.data.error}`
      }
      props.setNotification(data, 5000)
    }
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        <label>Title:</label>
        <input {...title.inputContent} />
      </div>
      <div>
        <label>Author:</label>
        <input {...author.inputContent} />
      </div>
      <div>
        <label>Url:</label>
        <input {...url.inputContent} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)