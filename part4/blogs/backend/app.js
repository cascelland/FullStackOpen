const express = require('express')
const cors = require('cors')
const app = express()

const blogRouter = require('./controllers/blog')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app