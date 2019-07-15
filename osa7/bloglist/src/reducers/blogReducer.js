import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

export const addBlog = blog => {
    return async dispatch => {
        blogService.create(blog)
            .then(response => {
                dispatch({
                    type: 'ADD_BLOG',
                    blog: response
                })
            })
            .catch(error => {
                const data = {
                    type: 'error',
                    content: `${error.response.data.error}`
                }
                dispatch(setNotification(data, 5000))
            })
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        blogService.createComment(blog, comment)
            .then(response => {
                dispatch({
                    type: 'UPDATE_BLOG',
                    blog: response
                })
            })
            .catch(error => {
                const data = {
                    type: 'error',
                    content: `${error.response.data.error}`
                }
                dispatch(setNotification(data, 5000))
            })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        blogService.update({
            ...blog,
            likes: blog.likes + 1
        })
            .then(response => {
                dispatch({
                    type: 'UPDATE_BLOG',
                    blog: response
                })
            })
            .catch(error => {
                const data = {
                    type: 'error',
                    content: `${error.response.data.error}`
                }
                dispatch(setNotification(data, 5000))
            })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        blogService.deletion(id)
            .then(dispatch({
                type: 'REMOVE_BLOG',
                id
            }))
            .catch(error => {
                const data = {
                    type: 'error',
                    content: `${error.response.data.error}`
                }
                dispatch(setNotification(data, 5000))
            })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            blogs
        })
    }
}

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.blogs
        case 'ADD_BLOG':
            return state.concat(action.blog)
        case 'UPDATE_BLOG':
            state = state.map(b => b.id !== action.blog.id ? b : action.blog)
            return state
        case 'REMOVE_BLOG':
            state = state.filter(b => b.id !== action.id)
            return state
        default:
            return state
    }
}

export default blogReducer