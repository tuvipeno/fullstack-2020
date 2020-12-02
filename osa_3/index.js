// const { json } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :posted'))
app.use(cors())

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


const info = () => {
    const length = contacts.length
    const info = `Phonebook has info for ${length} people`
    const today = new Date()
    return (`${info} ${today}`)
}

app.get('/api/contacts', (request, response) => {
    // morgan(request, response)
    response.json(contacts)
})

app.get('/info', (request, response) => {
    const i = info()
    response.json(i)
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const generateId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  morgan.token('posted', function (request, response) { return JSON.stringify(request.body) })

app.post('/api/contacts', (request, response) => {
    const body = request.body
    const usedName = contacts.find(c => c.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (usedName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: generateId(1, 250000)
    }

    contacts = contacts.concat(contact)

    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})