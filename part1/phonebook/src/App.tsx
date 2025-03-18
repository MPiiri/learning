import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 555}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [filter, setFilter] = useState('')
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
    if(!persons.map(person => person.name).includes(newName)) {
    event.preventDefault()
    setPersons(persons.concat({ name: newName, number: newNumber }))
    } else {
      event.preventDefault()
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter: <input onChange={(event) => setFilter(event.target.value)}/></div>
      <form onSubmit={addName}>
        <div>
        <div>debug: {newName} {newNumber}</div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input type="number" value={newNumber} onChange={(handleNumberChange)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
      .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      ...
    </div>
  )
}

export default App