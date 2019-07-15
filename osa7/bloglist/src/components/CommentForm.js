import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = (props) => {
    const createComment = async (event) => {
        event.preventDefault()
        const comment = {
            content: event.target.elements.newComment.value
        }
        props.addComment(props.blog, comment)
        const data = {
            type: 'notification',
            content: 'Your comment has been added!'
        }
        props.setNotification(data, 5000)
        event.target.elements.newComment.value = ''
    }

    return (
        <Form onSubmit={createComment}>
            <Form.Group controlId='newComment'>
                <Form.Control type='text' placeholder='Write a comment' />
            </Form.Group>
            <Form.Group>
                <Button type='submit'>Add comment</Button>
            </Form.Group>
        </Form>
    )
}

const mapDispatchToProps = {
    addComment,
    setNotification
}

export default connect(null, mapDispatchToProps)(CommentForm)