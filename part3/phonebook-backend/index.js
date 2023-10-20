const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.post('/api/persons', (req, res) => {
    const body = req.body

    const person = {
        id: getRandomInt(1, 99999),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`running on ${PORT}...`)
})