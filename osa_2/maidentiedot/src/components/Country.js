import React from 'react'

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img src={country.flag} height="100" width="100"/>
        </div>
    )
}

export default Country