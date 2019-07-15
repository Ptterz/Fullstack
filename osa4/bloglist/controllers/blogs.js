const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const Comment = require('../models/Comment')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user').populate('comments')
    response.status(200).json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('user').populate('comments')
        response.status(200).json(blog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        var blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            comments: body.comments,
            user: user
        })

        if (blog.likes === undefined) {
            blog.likes = 0
        }

        if (blog.comments === undefined) {
            blog.comments = []
        }

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const body = request.body
        console.log(body)
        const id = request.params.id
        const comment = new Comment({
            content: body.content
        })
        const savedComment = await comment.save()
        var blog = await Blog.findById(id)
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        blog = await Blog.findById(id).populate('user').populate('comments')
        response.status(201).json(blog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing' })
        }

        const user = await User.findById(decodedToken.id)
        if (blog.user.toString() === user._id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            user.blogs = user.blogs.filter(b => b.id !== blog.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'token invalid' })
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: blog.likes }, { new: true }).populate('user').populate('comments')
        response.status(200).json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter