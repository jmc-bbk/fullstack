import {useState, useEffect} from 'react'
import axios from 'axios'

const CountryListView = ({countries}) => {
  const [toShow, setToShow] = useState(Array(countries.length).fill(false))
  
  const handleClick = (idx) => {
    const newToShow = toShow.slice()
    newToShow[idx] = !toShow[idx]
    setToShow(newToShow) 
  }
  
  return (
    countries.map((c, idx) => 
      <div key={idx}>
        <p>{c.name.common}</p>
        <button onClick={() => handleClick(idx)}>show</button>
        {toShow[idx] && <Country country={countries[idx]} />}
      </div>
    )
  )
}

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

const Countries = ({countries}) => {

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else if (countries.length < 10) {
    return <CountryListView countries={countries} />
  } else {
    return <p>Too many matches, specify another filter</p>
  }

}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([]) 

  const getCountries = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }

  useEffect(getCountries, [])

  const filterCountriesHelper = (filter) => {
    return countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(filterCountriesHelper(event.target.value))
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
        countries={filteredCountries}
      />
    </div>
  )
}

export default App
