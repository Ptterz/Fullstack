import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = (props) => {
  const style = {
    margin: 5
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.elements.titleInput.value,
      author: event.target.elements.authorInput.value,
      url: event.target.elements.urlInput.value,
      comments: [],
    }
    props.addBlog(newBlog)
    const data = {
      type: 'notification',
      content: `A new blog '${newBlog.title}' by '${newBlog.author}' added!`
    }
    props.setNotification(data, 5000)
    props.blogFormRef.current.toggleVisibility()
  }

  const cancelAndHide = () => props.blogFormRef.current.toggleVisibility()

  return (
    <Form onSubmit={createBlog}>
      <Form.Group controlId='titleInput'>
        <Form.Label>Title:</Form.Label>
        <Form.Control type='text' name='title' placeholder='Enter title' data-cy='titleInputField' />
      </Form.Group>
      <Form.Group controlId='authorInput'>
        <Form.Label>Author:</Form.Label>
        <Form.Control type='text' name='author' placeholder='Enter author' data-cy='authorInputField' />
      </Form.Group>
      <Form.Group controlId='urlInput'>
        <Form.Label>Url:</Form.Label>
        <Form.Control type='text' name='url' placeholder='Enter url' data-cy='urlInputField' />
      </Form.Group>
      <Form.Group>
        <Button variant='primary' type="submit" style={{ marginRight: 5 }} data-cy='createNewBlogButton' >
          Create
        </Button>
        <Button variant='primary' onClick={cancelAndHide} style={style} data-cy='cancelNewBlogButton' >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  )
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)