import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&appid=91349473260125a4ffd3f6169314079a`;

      axios
        .get(url)
        .then((response) => {
          // Convert temperature from Kelvin to Celsius
          const celsiusTemp = Math.round(response.data.main.temp - 273.15);

          // Update state with converted temperature
          setData({
            ...response.data,
            main: {
              ...response.data.main,
              temp: celsiusTemp,
            },
          });

          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  return (
    <>
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter the Location"
            type="text"
          />
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              <h1>{data.main ? `${data.main.temp}°C` : ""}</h1>
            </div>
            <div className="description">
              <p>{data.weather ? data.weather[0].description : ""}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p>{data.main ? `${data.main.feels_like}°C` : ""}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? `${data.main.humidity}%` : ""}
              </p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? `${data.wind.speed} MPH` : ""}
              </p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
