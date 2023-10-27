const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  if ((!password) || (password.length < 3)) {
    let error = new Error('password too short or undefined')
    error.name = 'ValidationError'
    next(error)
    return
  }

  const salt = 10
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch(error) {
    next(error)
  }

})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})


module.exports = usersRouter