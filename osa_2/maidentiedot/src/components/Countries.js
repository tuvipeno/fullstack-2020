import React, { useState } from 'react'
import Country from './Country'


const Countries = ({shown}) => {
    console.log('showable', shown)
    // const showable = props.shown
    // console.log('showables', showable)
    const [countries, setShown] = useState(shown)
    
    console.log(countries)

    const showCountry = (c) => {
        return (<Countries shown={c} />)
        
    }
    

    if (shown.length <= 10 && shown.length > 1)
        return (
            shown.map(country => 
                <p key={country.name}>{country.name}
                <button onClick={() => showCountry(country)}>show</button></p>
                )        
        )
    else if (shown.length === 1)
        return (
            <Country country={shown[0]} />
        )
    else return (
        <div>
            Too many matches, specify another filter
        </div>
    )
}

export default Countries