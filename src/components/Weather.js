import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "b572d6320f3b0e962edd3b222a951914";

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  const getBackgroundStyle = () => {
    if (weather.data) {
      const temp = weather.data.main.temp - 273.15; // Convert to Celsius
      const condition = weather.data.weather[0].main.toLowerCase();
      const humidity = weather.data.main.humidity;

      if (condition.includes("rain")) {
        return { background: "linear-gradient(to bottom, #5f5f5f, #8c8c8c)" }; // Rain
      } else if (temp >= 30) {
        return { background: "linear-gradient(to bottom, #ff512f, #f09819)" }; // Hot
      } else if (temp <= 15) {
        return { background: "linear-gradient(to bottom, #00c6ff, #0072ff)" }; // Cold
      } else if (humidity > 70) {
        return { background: "linear-gradient(to bottom, #6a11cb, #2575fc)" }; // Humid
      }
    }
    return { background: "linear-gradient(to bottom, #e0eafc, #cfdef3)" }; // Default
  };

  return (
    <div className="weather-app" style={getBackgroundStyle()}>
      <div className="weather">
        <span className="title">Weather App</span>
        <form>
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={(e) => handleChange(e)}
          />
          &nbsp; &nbsp;
          <input
            type="text"
            placeholder="Country"
            name="country"
            onChange={(e) => handleChange(e)}
          />
          <button className="getweather" onClick={(e) => weatherData(e)}>
            Submit
          </button>
        </form>

        {weather.data !== undefined ? (
          <DisplayWeather data={weather.data} />
        ) : null}
      </div>
    </div>
  );
}

export default Weather;
