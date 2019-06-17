const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        title: 'MyBlog',
        author: 'Pete',
        url: 'MySpace.com',
        likes: 4
    },
    {
        title: 'Heja Värld',
        author: 'Ulrika',
        url: 'Bloggers.com',
        likes: 400
    },
    {
        title: 'Que pasa',
        author: 'Antonio',
        url: 'Bloggers.com',
        likes: 40
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}