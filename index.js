const express = require('express');
const app = express();
const PORT = 3001;


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
        response.status(404).end()
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


app.listen(PORT, () => {
    console.log(`app running in port: ${PORT}`);
})