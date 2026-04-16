import React, { useEffect, useState } from 'react'
import './Weather.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clouds_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import heavy_icon from '../assets/heavy.png'
import humidity_icon from '../assets/humidity.png'
import snowflake_icon from '../assets/snowflake.png'
import suncloud_icon from '../assets/suncloud.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": clouds_icon,
    "02n": clouds_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": heavy_icon,
    "04n": heavy_icon,
    "09d": drizzle_icon,
    "10d": drizzle_icon,
    "13d": snowflake_icon,
    "50d": suncloud_icon,
  }

  const search = async (cityName) => {

    // ✅ CORRECT IF CONDITION (no auto alert issue)
    if (!cityName || cityName.trim() === "") {
      alert("Enter city name")
      return
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url)
      const data = await response.json()

      console.log(data)

      if (!data || !data.weather) return

      const icon = allIcons[data.weather[0].icon] || clear_icon

      setWeatherData({
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon
      })

    } catch (error) {
      console.log("Error:", error)
    }
  }

  // ✅ only run once with default city
  useEffect(() => {
    search(city)
  }, [])

  return (
    <div className='weather'>

      {/* SEARCH BAR */}
      <div className="search-bar">

        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Search city'
        />

        <img
          src={search_icon}
          alt=""
          onClick={() => search(city)}
        />

      </div>

      {/* ICON */}
      <img
        src={weatherData?.icon || clear_icon}
        alt=""
        className='weather-icon'
      />

      {/* TEMP */}
      <p className='temperature'>
        {weatherData ? weatherData.temperature : "--"}°C
      </p>

      {/* LOCATION */}
      <p className='location'>
        {weatherData ? weatherData.location : "--"}
      </p>

      {/* DATA */}
      <div className='weather-data'>

        <div className='col'>
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData ? weatherData.humidity : "--"}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className='col'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData ? weatherData.windSpeed : "--"} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Weather