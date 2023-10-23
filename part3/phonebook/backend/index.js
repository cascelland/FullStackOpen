require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.static('dist'))

app.use(express.json())
//app.use(morgan('tiny'))

const Person = require('./models/person')

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
        .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
    const date = new Date()
    Person.find({}).then(persons => {
        res.send(`Phonebook has info for ${persons.length} people.<br /><br />${date}`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        const error = new Error("Name or number missing")
        error.name = "NameOrNumberMissing"
        next(error)
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(person => {
        res.json(person)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person).then(updatedPerson => {
        res.json(updatedPerson)
    })
        .catch(error => next(error))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name == "CastError") {
        return res.status(400).send({ error: "wrong id format" })
    }

    if (err.name == "NameOrNumberMissing") {
        return res.status(400).send({ error: "name or number are missing" })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`running on ${PORT}...`)
})