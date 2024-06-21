import React, { useState, createContext, useContext } from "react";

export default function Test() {
  // instead of requesting data from an API, use this mock data
  const mockWeatherData = {
    "New York": {
      temperature: "22°C",
      humidity: "56%",
      windSpeed: "15 km/h",
    },
    "Los Angeles": {
      temperature: "27°C",
      humidity: "45%",
      windSpeed: "10 km/h",
    },
    London: {
      temperature: "15°C",
      humidity: "70%",
      windSpeed: "20 km/h",
    },
  };

  const [searchCity, setSearchCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [searchHistory, setSearchHistory] = useState(new Set());
  const [error, setError] = useState();

  const searchHandler = () => {
    setError();
    setWeatherData(mockWeatherData[searchCity] ?? setError("City not found."));
    setSearchHistory((prev) => new Set([...prev, searchCity]));
  };

  const changeHandler = (e) => {
    setSearchCity(e.target.value);
  };
  const historyHandler = (data) => {
    setSearchCity(data);
    searchHandler();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchHandler();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="citySearch"
        placeholder="Search for a city..."
        onChange={changeHandler}
        value={searchCity && searchCity}
      />
      <button id="searchButton">Search</button>
      <div id="weatherData">
        <div>Temperature: {weatherData?.temperature}</div>
        <div>Humidity: {weatherData?.humidity}</div>
        <div>Wind Speed: {weatherData?.windSpeed}</div>
        <div>{error}</div>
      </div>
      {searchHistory &&
        [...searchHistory].map((history, index) => {
          return (
            <button
              id="previousSearches"
              key={index}
              onClick={() => historyHandler(history)}
            >
              {history}
            </button>
          );
        })}
    </form>
  );
}
