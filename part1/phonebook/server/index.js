import express from 'express'
const app = express()
const port = 3001

import morgan from 'morgan'
import cors from 'cors';
app.use(express.static('public'));
import { connectDB } from './mondoDB.js';
import User from './schema.js';

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cors())

morgan.token('post-data', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :response-time :post-data'));


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
})
app.get('/api/persons', async (req, res) => {
    try {
        const persons = await User.find({});
        res.json(persons);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});
app.get(`/info`, async (request, response) => {
    try {
        const count = await User.countDocuments({});
        response.send(`<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`)
    } catch (error) {
        response.status(500).json({ error: 'Database error' });
    }
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
app.post('/api/persons', async (request, response) => {
    const { name, number } = request.body;

    if (!name || !number) {
        return response.status(400).json({ error: 'Name or number missing' });
    }

    const existingPerson = await User.findOne({ name });
    if (existingPerson) {
        return response.status(400).json({ error: 'Name must be unique' });
    }


    try {
        const person = new User({ name, number });
        const savedPerson = await person.save();
        response.status(201).json(savedPerson);
    } catch (error) {
        response.status(500).json({ error: 'Database error' });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
