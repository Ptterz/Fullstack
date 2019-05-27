import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
    const [weatherData, setWeatherData] = useState([])
    const [huf, setHuf] = useState(country[0].capital)

    const getWeather = () => (
        <div>
            <h2>Weather in {huf}</h2>
            <p><strong>temperature: </strong> {weatherData.current.temp_c} Celsius</p>
            <img src={weatherData.current.condition.icon}/>
            <p><strong>wind: </strong> {weatherData.current.wind_kph} kph direction {weatherData.current.wind_dir}</p>
        </div>
    )

    useEffect(() => {
        axios
            .get('https://api.apixu.com/v1/current.json?key=69ecaddb47bd40c7b8a130747192205&q=' + huf)
            .then(result => {
                setWeatherData(result.data)
            })
    }, [huf])

    return (
        <div>
            <h2>{country[0].name}</h2>
            <p>Capital {huf}</p>
            <p>Population {country[0].population}</p>
            <h3>languages</h3>
            <ul>
                {country[0].languages.map(
                    lang => (
                        <li key={lang.name}>{lang.name}</li>
                    ))
                }
            </ul>
            <img
                src={country[0].flag} width="200" height="200"
                alt="Swedish flag"
            />
            {
                weatherData.length === 0
                    ? <p>Loading weather</p>
                    : getWeather()
            }
        </div>
    )
}

export default Country