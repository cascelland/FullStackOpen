const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

/* if (process.argv.length<3) {
    console.log("Password missing")
    process.exit(1)
} */

//const password = process.env.PASSWORD

//const url = `mongodb+srv://cascelland:${password}@fullstackopen.jkhuvxo.mongodb.net/noteApp?retryWrites=true&w=majority`

//const Note = mongoose.model('Note', noteSchema)

const Note = require('./models/note')

const app = express()
app.use(cors())

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  //res.json(notes)
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

/* const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
} */

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  /*   const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    } */

  const note = new Note({
    content: body.content,
    important: body.important
  })

  //notes = notes.concat(note)
  note.save().then(savedNote => {
    response.json(savedNote)
  })

  //response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
 /*  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

  response.json(note) */
  
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.use(unknownEndpoint)

//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})