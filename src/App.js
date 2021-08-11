import React, { useState } from "react";
import Axios from 'axios'
import "./App.css";

function App() {

  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState({
    description: " ",
    temp: " ",
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    sunrise: 0,
    sunset: 0,
    country: " "
    
  })

  const [dataLoaded,setLoaded] = useState(false);

  const searchWeather = () => {
    Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fa71672dc9b3732df60640de85c47718`)
    .then((response) => {
      console.log(response.data);

      setWeatherData({
        description: response.data.weather[0].description, 
        temp: response.data.main.temp, 
        temp_min: response.data.main.temp_min, 
        temp_max: response.data.main.temp_max, 
        humidity: response.data.main.humidity, 
        sunrise: response.data.sys.sunrise, 
        sunset: response.data.sys.sunset, 
        country: response.data.sys.country,
      });

      setLoaded(true);
    });
  };


  return (
    <div className="App"> 
        <h1>Current Weather</h1>
      <div className="inputs">
        <input type="text"  onChange={(e) => {
          setCity(e.target.value);
            console.log(e.target.value);

        }}
      
        />
        <button onClick={searchWeather}>Search</button>
      </div>

      <div className="displayDataContainer">

        {dataLoaded && (
        <div className="data">
        <h3>Description: {weatherData.description}</h3>
        <h3>Temperature: {weatherData.temp}</h3>
        <h3>Minimum Temperature: {weatherData.temp_min}</h3>
        <h3>Maximum Temperature: {weatherData.temp_max}</h3>
        <h3>Humidity: {weatherData.humidity}</h3>
        <h3>Sunrise: {weatherData.sunrise}</h3>
        <h3>Sunset: {weatherData.sunset}</h3>
        <h3>Country: {weatherData.country}</h3>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;


