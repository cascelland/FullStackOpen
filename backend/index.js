const express = require('express')
const cors = require('cors')

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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'wrong id format' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(requestLogger)

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

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  /*   if (body.content == undefined) {
    return response.status(400).json({
    error: 'content missing'
    })
  } */

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
    .catch(error => next(error))

  //response.json(note)
})

app.get('/api/notes/:id', (request, response, next) => {
  /*  const id = Number(request.params.id)
   const note = notes.find(note => note.id === id)

   if (note) {
     response.json(note)
   } else {
     response.status(404).end()
   }

   response.json(note) */

  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => { next(error) })
})

/* We notice that the backend has now a problem:
validations are not done when editing a note.
The documentation addresses the issue by explaining
that validations are not run by default when
 findOneAndUpdate is executed. */

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  /* Notice that the findByIdAndUpdate method receives a regular
  JavaScript object as its parameter, and not a new note object
  created with the Note constructor function. */

  /* const note = {
    content: body.content,
    important: body.important
  } */

  /* We added the optional { new: true } parameter,
  which will cause our event handler to be called with the
  new modified document instead of the original. */

  Note.findByIdAndUpdate(
    request.params.id, { content, important },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

//const PORT = 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})