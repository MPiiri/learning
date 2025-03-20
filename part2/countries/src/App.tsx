import axios from "axios"
import { useEffect, useState } from "react"
const Filter = ({ filter, handleChange }: { filter: string, handleChange: any }) => {
  return (
    <form name="filter">
      Filter: <input value={filter} onChange={handleChange} />
      <div>{filter}</div>
    </form>
  )
}
function App() {
  const [countries, setCountries] = useState<any[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })


  }, [])
  const handleChange = (event: any) => {
    event.preventDefault()
    setFilter(event.target.value.toLowerCase())
  }
  useEffect(() => {
    
  })
  let filteredCountries = (countries.filter(country => country.name.common.toLowerCase().includes(filter)))
  let namesOfCountries = filteredCountries.map(country => (
    <li key={country.name.common}>
      {country.name.common}
      <button type="button" onClick={() => { setFilter(country.name.common.toLowerCase()) }}>
        Show
      </button>
    </li>
  ))
  let countryData = filteredCountries
    .map(country =>
      <div key={country.name.common}>
        <img src={country.flags.png}></img>
        <br />Name: {country.name.common}
        <br /> Capital: {country.capital}
        <br />Area: {country.area}
        <br />Languages: {JSON.stringify(country.languages)}
      </div>);
  console.log(countryData);

  const Countries = () => {

    return (
      <>
        <h2>Countries</h2>
        <div>

          {namesOfCountries.length === 1 ? countryData : (namesOfCountries.length <= 10 ? namesOfCountries : "Too many matches, specify another filter")}
        </div>
      </>
    )
  }
  return (
    <>
      <Filter filter={filter} handleChange={handleChange}></Filter>
      <Countries></Countries>
    </>
  )
}

export default App
