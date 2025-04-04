import express from 'express'
const app = express()
const port = 3001
import morgan from 'morgan'
import cors from 'cors';
app.use(express.static('public'));

app.use(cors())
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :response-time :post-data'));

app.use(express.json());
const generateId = () => {
    const maxId = persons.length > 0
        ? Math.floor(Math.random() * 4000)
        : 0
    return String(maxId + 1)
}
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get(`/info`, (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${new Date()}</p>`)
})
app.get(`/api/persons/:id`, (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})
app.delete(`/api/persons/:id`, (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'name or number missing' });
    }
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ error: 'name must be unique' });
    }

    let person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person);

    response.json(person)
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
