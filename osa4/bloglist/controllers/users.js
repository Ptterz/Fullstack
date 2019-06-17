const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs')
        response.json(users.map(user => user.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

userRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        if (body.password.length < 3) {
            throw new Error('Password is too short!')
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = userRouter