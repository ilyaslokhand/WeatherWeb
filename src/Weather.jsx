import React, { useState, useEffect } from "react";
import search from "./assets/Assets/search.png";
import cloud from "./assets/Assets/cloud.png";
import wind from "./assets/Assets/wind.png";
import humidity from "./assets/Assets/humidity.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./Redux/fetchWeatherslice";
import rain from "./assets/Assets/rain.png";
import drizzle from "./assets/Assets/drizzle.png";
import clear from "./assets/Assets/clear.png";
import snow from "./assets/Assets/snow.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  // Accessing state from the store
  const { data, loading, error } = useSelector((state) => state.weather);

  // Trigger weather data fetch
  const handleSearch = () => {
    if (city) {
      console.log("Dispatching fetchWeather with city:", city);
      dispatch(fetchWeather(city));
    }
    if (city == "") {
      alert("enter city name");
    }
  };

  const weatherImages = {
    clear,
    snow,
    drizzle,
    rain,
    cloud,
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-700 via-blue-900 to-purple-800">
      <div className="bg-gradient-to-tr from-[#2f4690] to-[#500ae4] rounded-lg p-6 shadow-2xl shadow-black w-96">
        {/* Search Section */}
        <div className="flex gap-4">
          <input
            className="bg-green-50 border-white border-2 rounded-xl w-64 h-12 text-black px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
            placeholder="Search"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="bg-green-50 w-12 h-12 flex justify-center items-center border-black border-2 rounded-xl hover:bg-green-200 transition-all"
            onClick={handleSearch}
          >
            <img src={search} alt="Search" />
          </button>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center items-center my-6">
          <img src={weatherImages[data.weatherImage]} className="h-40" />
        </div>

        {/* Weather Info */}

        <div className="flex flex-col items-center text-white">
          <p className="text-5xl font-bold drop-shadow-lg">
            {data?.main?.temp}°C
          </p>
          <p className="text-2xl font-medium drop-shadow-lg">{data?.name}</p>
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center gap-6 mt-6 text-white">
          <div className="flex items-center gap-2">
            <img src={humidity} alt="Humidity Icon" className="h-8" />
            <div className="text-center">
              <p className="text-xl font-semibold">{data?.main?.humidity}%</p>
              <p className="text-sm text-gray-300">Humidity</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={wind} alt="Wind Icon" className="h-8" />
            <div className="text-center">
              <p className="text-xl font-semibold">{data?.wind?.speed}</p>
              <p className="text-sm text-gray-300">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
