// const { json } = require('express')
require('dotenv').config()
const mexpress = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :posted'))
app.use(cors())
app.use(express.static('build'))

let contacts = [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323524",
      "id": 1
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 2
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 3
    },
    {
      "name": "Arto Hellas",
      "number": "050-1234567",
      "id": 4
    }
]

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
        const length = contacts.length
        const info = `Phonebook has info for ${length} people`
        const today = new Date()
        response.json(`${info} ${today}`)
    })
    
})

app.get('/api/contacts/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
            // response.status(400).send({ error: 'malformatted id' })     
})


app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
    // const id = Number(request.params.id)
    // contacts = contacts.filter(contact => contact.id !== id)

})

const generateId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

morgan.token('posted', function (request, response) { return JSON.stringify(request.body) })

app.post('/api/contacts', (request, response, next) => {
    const body = request.body

    const contact = new Contact({
        name: body.name,
        number: body.number
    })
    
    contact.save()
        .then(savedContact => {
            response.json(savedContact)
        })
        .catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true})
    .then(updatedContact => {
        response.json(updatedContact)
    })
    .catch(error => next(error))
    
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message }) // status(400).
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})