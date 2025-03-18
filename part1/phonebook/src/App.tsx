import { useEffect, useState } from 'react'
import { getPersons } from './Service';
import { postPerson } from './Service';
import { delPerson } from './Service';
import { updatePerson } from './Service';

const Persons = ({ persons, filter }: { persons: { name: string, number: number, id: number }[], filter: string }) => {
  const deletePerson = (id: number) =>
    window.confirm(`Delete ${persons.find(person => person.id === id)?.name}`) &&
    delPerson(id).then(() => window.location.reload())
  return (
    <>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <div key={person.name}><p>{person.name} {person.number}</p> <button onClick={() => deletePerson(person.id)}>delete</button></div>)
      }
    </>
  );
};
const Filter = ({ setFilter }: { setFilter: any }) => {
  return (
    <div>Filter: <input onChange={(event) => setFilter(event.target.value)} /></div>
  )
}
const Form = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, setIds, ids }:
  { newName: string, setNewName: any, newNumber: number, setNewNumber: any, persons: { name: string, number: number, id: number }[], setPersons: any, setIds: any, ids: any }) => {
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
      setIds(persons.length + 1)
      setPersons(persons.concat({ name: newName, number: newNumber, id: ids.toString() }))
      postPerson('http://localhost:3001/persons', { name: newName, number: newNumber, id: ids.toString() })

    } else {
      event.preventDefault()
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
        updatePerson(persons.find(person => person.name === newName)?.id, { name: newName, number: newNumber, id: persons.find(person => person.name === newName)?.id }).then(() => window.location.reload())
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
    getPersons()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      });
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [ids, setIds] = useState(0)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}></Filter>
      <Form newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setIds={setIds} ids={ids}></Form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}></Persons>
    </div>
  )
}

export default App