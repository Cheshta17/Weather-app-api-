import React from "react";
import "./displayweather.css";

function DisplayWeather({ data }) {
  const getBackgroundStyle = () => {
    const temp = data.main.temp - 273.15; // Convert Kelvin to Celsius
    const condition = data.weather[0].main.toLowerCase();
    const humidity = data.main.humidity;

    if (condition.includes("rain")) {
      return { background: "linear-gradient(to bottom, #555, #888)" }; // Rain: Grey
    } else if (temp >= 25) {
      return { background: "linear-gradient(to right, #ff512f, #f09819)" }; // Hot: Red-Yellow
    } else if (temp <= 15) {
      return { background: "linear-gradient(to right, #36d1dc, #5b86e5)" }; // Cold: Blue
    } else if (humidity > 70) {
      return { background: "linear-gradient(to right, #6a11cb, #2575fc)" }; // Humid: Purple-Blue
    } else {
      return { background: "linear-gradient(to right, #e0eafc, #cfdef3)" }; // Default: Light Gradient
    }
  };

  return (
    <div className="weather-card" style={getBackgroundStyle()}>
      <h2>{data.name}, {data.sys.country}</h2>
      <h1>{(data.main.temp - 273.15).toFixed(1)}°C</h1>
      <p>Condition: {data.weather[0].main}</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
}

export default DisplayWeather;
