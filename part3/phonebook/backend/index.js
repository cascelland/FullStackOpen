require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
app.use(morgan('tiny'))

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)

morgan.token('body', req => {
    return JSON.stringify(req.body)
  })

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
            res.json(persons)
    })
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`Phonebook has info for ${persons.length} people.<br /><br />${date}`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    let int = Math.floor(Math.random() * (max - min) + min)
    const ids = persons.map(person => person.id)
    while (ids.includes(int)) {
        int = Math.max(Math.floor(Math.random() * (max - min) + min), persons.length + 1)
    }
    return int
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number are missing"
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: getRandomInt(1, 99999),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`running on ${PORT}...`)
})