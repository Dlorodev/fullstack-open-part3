const express = require('express');
const app = express();
const PORT = 3001;
app.use(express.json());

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

//get all persons
app.get('/api/persons', (request, response) => {
    response.send(persons)
})

//get info
app.get('/info', (request, response) => {
    const now = new Date();
    //console.log(now.toString())
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>`
    )
})

//get one person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    console.log(person, typeof person);

    if (person) {
        response.send(person)
    } else {
        response.status(404).json({ error: "The contact does not exist" }).end()
    }
})

//delete one person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    persons = persons.filter(p => p.id !== id);
    console.log('Persons: ', persons);

    if (!person) {
        response.status(404).end();
    } else {
        response.status(204).end();
    }
})

//add one person
app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(body)
    const newId = Math.floor(Math.random() * 100)

    const personObject = {
        id: newId,
        name: body.name,
        number: body.number
    }


    if (!personObject.name || !personObject.number) {
        response.status(400).json({ error: 'The contact must have Name and Number' }).end()
    } else if (persons.some(person => person.name.toLowerCase() === personObject.name.toLowerCase())) {
        response.status(409).json({ error: 'The name must be unique' }).end()
    } else {
        persons = persons.concat(personObject)
        console.log(`${body.name} has been added!`)
        response.status(201).send(personObject)
    }
})


app.listen(PORT, () => {
    console.log(`app running in port: ${PORT}`);
})