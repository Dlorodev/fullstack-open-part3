const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

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

//custom request logger
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger);
//app.use(morgan('tiny'));

//custom token for morgan
morgan.token('body', function getBody(request) {
    //console.log(typeof JSON.stringify(request.body));
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
});

app.use(morgan(':method :url :status :res[content-length] :response-time :body'))

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

const generateId = () => {
    const maxId = persons.length > 0 ? Math.floor(Math.random() * 200) : 0;
    return maxId + 1;
}

//add one person
app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(body)

    const personObject = {
        id: generateId(),
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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


app.listen(PORT, () => {
    console.log(`app running in port: ${PORT}`);
})