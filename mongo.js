const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://dlorodev:${password}@clusterfso.g8sanm2.mongodb.net/phonebook?retryWrites=true&w=majority&appName=ClusterFSO`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length < 3) {
    console.log('You must use node mongo.js password name number')
    //console.log(process.argv)
    process.exit(1)
} else if (process.argv.length === 3) {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    person.save().then(result => {
        console.log(`Added ${person.name} number: ${person.number} to the phonebook.`)
        mongoose.connection.close()
    })
}
