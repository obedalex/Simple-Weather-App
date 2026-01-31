import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [query, setQuery] = useState("London");

  const search = async (city = query) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error in fetching Weather data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="main-box">
      <div className="navbox">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => search()}>Search</button>
      </div>
      <div className="Results">
        {weatherData ? (
          <>
                      <p>The temperature is {""} {Math.floor(weatherData.main.temp)}&deg;C</p>

            <div className="final-box">
                          <p>Humidity {weatherData.main.humidity}%</p>
                          <p>Wind speed {weatherData.wind.speed}km/h</p>
            </div>
          </>
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};

export default Weather;

//I first build the UI
//I use state management to gather the various states
//
