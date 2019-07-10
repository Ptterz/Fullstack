import blogService from '../services/blogs'

export const addBlog = blog => {
    return async dispatch => {
        const response = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            blog: response
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updated = await blogService.update({
            ...blog,
            likes: blog.likes + 1
        })
        dispatch({
            type: 'LIKE_BLOG',
            blog: updated
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.deletion(id)
        dispatch({
            type: 'REMOVE_BLOG',
            id
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
        case 'LIKE_BLOG':
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