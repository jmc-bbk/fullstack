import {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang, idx) => <li key={idx}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt='flag' />
    </div>
  )
}

const Countries = ({countries, filter}) => {

  const filterCountries = () => {
    return countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  const filteredCountries = filterCountries()

  let country = null
  if (filteredCountries.length == 1) {
    country = filteredCountries[0]
    return <Country country={country} />
  } else if (filteredCountries.length < 10) {
    return (
      filteredCountries.map((country, idx) => <p key={idx}>{country.name.common}</p>)
    )
  } else {
    return <p>Too many matches, specify another filter</p>
  }

}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Countries</h2>
      <p>Find countries</p>
      <input
        value={filter}
        onChange={handleFilterChange}
      />
      <Countries
        countries={countries}
        filter={filter}
      />
    </div>
  )
}

export default App
