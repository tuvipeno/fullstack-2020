const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://Tuomas:${password}@fullstack-cluster.ohlhl.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

function nameLengthVal (val) {
    return val.length > 3
}

function numberLengthVal (val) {
    return val.length > 8
}

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        validate: nameLengthVal
    },
    number: {
        type: String,
        validate: numberLengthVal,
        required: true
    }
})

contactSchema.plugin(uniqueValidator)

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length<4) {
    console.log('Phonebook:')
    Contact
        .find({})
        .then(result => {
            result.forEach(contact => {
                console.log(`${contact.name} ${contact.number}`)
            })
        mongoose.connection.close()
        })
}

if (process.argv[4]) {
    contact.save().then(response => {
        console.log(`Added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })
}
