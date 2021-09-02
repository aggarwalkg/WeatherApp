import React, { useState, useEffect } from "react";
import moment from "moment";
import Graph from "./Components/Graph";
import "./App.css";
const api = {
  key: "fff592fae2e8ed5526bbf703869c8305",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("10001");
  const [weather, setWeather] = useState({});
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    fetch(`${api.base}weather?zip=${query},us&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  }, []);
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${query},us&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  let sunRiseTime = new Date(weather?.sys?.sunrise * 1000).getTime();
  let sunSetTime = new Date(weather?.sys?.sunset * 1000).getTime();
  const handleClick = () => {
    setExpand(!expand);
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter Zip code..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="Max-min-box">
                  <div className="min-temp">
                    <label>Min</label> {Math.round(weather.main.temp_min)}°c
                  </div>

                  <div className="max-temp">
                    <label> Max</label> {Math.round(weather.main.temp_max)}°c
                  </div>
                </div>

                <div className="weather">{weather.weather[0].main}</div>
                <button onClick={handleClick} className="expandButton">
                  {expand ? "Show less" : "Show More"}
                </button>
              </div>

              {expand && (
                <div className="addition-info">
                  <div className="extra-info">
                    <label>Wind Speed</label> {Math.round(weather.wind.speed)}
                    km/miles
                  </div>

                  <div className="extra-info">
                    <label> Humidity</label> {Math.round(weather.main.humidity)}
                    %
                  </div>
                  <div className="extra-info">
                    <label>Pressure</label> {Math.round(weather.main.pressure)}
                    °c
                  </div>

                  <div className="extra-info">
                    <label> Sunrise</label>{" "}
                    {moment.utc(sunRiseTime).format().split("T")[1]}
                  </div>
                  <div className="extra-info">
                    <label>Sunset</label>{" "}
                    {moment.utc(sunSetTime).format().split("T")[1]}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="no-data">
              <div className="temp">No city found</div>
            </div>
          )}
        </div>
        <div className="graph-bg">
          <Graph />
        </div>
      </main>
    </div>
  );
}

export default App;
