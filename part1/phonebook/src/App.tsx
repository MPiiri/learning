import axios from 'axios';
import { useEffect, useState } from 'react'

const Persons = ({ persons, filter }: { persons: { name: string, number: number, id: number }[], filter: string }) => {
  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </>
  );
};
const Filter = ({ setFilter }: { setFilter: any }) => {
  return (
    <div>Filter: <input onChange={(event) => setFilter(event.target.value)} /></div>
  )
}
const Form = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }: { newName: string, setNewName: any, newNumber: number, setNewNumber: any, persons: { name: string, number: number, id: number }[], setPersons: any}) => {
  const handleNameChange = (event: any) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event: any) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addName = (event: any) => {
    if (!persons.map(person => person.name).includes(newName)) {
      event.preventDefault()
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    } else {
      event.preventDefault()
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <form onSubmit={addName}>
      <div>
        <div>debug: {newName} {newNumber}</div>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input type="number" value={newNumber} onChange={(handleNumberChange)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}
const App = () => {
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])

return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}></Filter>
      <Form newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons}></Form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  )
}

export default App