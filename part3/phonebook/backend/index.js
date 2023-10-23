require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
app.use(morgan('tiny'))

const Person = require('./models/person')

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
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "name or number are missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(person => {
        res.json(person)
    })
})



const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`running on ${PORT}...`)
})