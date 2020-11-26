import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
    const [countries, setCountries] = useState([])
    const [shown, setShown] = useState([])

    useEffect( () => {
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setShown(response.data)
      })
    }, [])

    const searchCountries = (event) => {
        setShown(
            countries.filter(
                country => country.name.toLowerCase().includes(
                    event.target.value.toLowerCase()
                )
            )
        )
    }
    return (
        <div>
            <p>find countries <input onChange={searchCountries}/></p>
            <Countries shown={shown} />
        </div>
    )
    
}

export default App