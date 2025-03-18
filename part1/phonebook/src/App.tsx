import { useState } from 'react'

const Persons = ({ persons, filter }: { persons: { name: string, number: number }[], filter: string }) => {
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
const Form = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }: { newName: string, setNewName: any, newNumber: number, setNewNumber: any, persons: { name: string, number: number }[], setPersons: any}) => {
  const handleNameChange = (event: any) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event: any) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(Number(event.target.value))
  }
  const addName = (event: any) => {
    if (!persons.map(person => person.name).includes(newName)) {
      event.preventDefault()
      setPersons(persons.concat({ name: newName, number: newNumber }))
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
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 555 }
  ])

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