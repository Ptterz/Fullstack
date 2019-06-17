const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/User')

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()

    await User.deleteMany({})

    const user = new User({
        name: 'test',
        username: 'root',
        password: 'sekret'
    })
    await user.save()
})

afterAll(() => {
    mongoose.connection.close()
})

describe('Testing initial blogs', () => {
    test('All blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })

    test('Content type is JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Identification is labeled correctly', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('Adding a new blog', () => {
    test('A new blog is added correctly', async () => {
        const newBlog = {
            title: 'Once upon a rainbow',
            author: 'Pete',
            url: 'breitbart',
            likes: 1000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsNow = await helper.blogsInDb()
        expect(blogsNow.length).toBe(helper.initialBlogs.length + 1)
        const noIds = blogsNow.map(blog => ({ title: blog.title, author: blog.author, url: blog.url, likes: blog.likes }))
        expect(noIds).toContainEqual(newBlog)
    })

    test('Likes values is zero if not given', async () => {
        const newBlog = {
            title: 'Once upon a cactus',
            author: 'Tim',
            url: 'stories.com'
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.body.likes).toBe(0)
    })

    test('Correct status code if title and url missing', async () => {
        const newBlog = {
            author: 'Tom',
            likes: 9
        }

        const response = await api.post('/api/blogs').send(newBlog)
        expect(response.status).toBe(400)
    })
})

describe('Deleting a blog', () => {
    test('Deleting a specific blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

        const ids = blogsAtEnd.map(blog => blog.id)
        expect(ids).not.toContain(blogToDelete.id)
    })
})

describe('Updating an existing blog', () => {
    test('Update likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[blogsAtStart.length - 1]
        const likesBefore = blogToUpdate.likes
        blogToUpdate.likes = likesBefore + 100

        const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
        expect(response.status).toBe(200)
        expect(response.body.likes).toBe(likesBefore + 100)
    })
})

describe('One user in the database', () => {
    test('Get initial user', async () => {
        const response = await api.get('/api/users')
        const usernames = response.body.map(user => user.username)
        expect(usernames).toContain('root')
    })

    test('Create a new user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Pete',
            username: 'Ptterz',
            password: 'monkeym3'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creating a user with taken username fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Petteri',
            username: 'root',
            password: 'apina'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

describe('Adding a new user', () => {
    test('with too short username fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Pete',
            username: 'CC',
            password: 'collective'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('with too short password fails', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'Pete',
            username: 'Collective',
            password: 'CC'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is too short')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})