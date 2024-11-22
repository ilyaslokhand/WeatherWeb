import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./fetchWeatherslice";

const store = configureStore({
  reducer: {
    weather: weatherReducer, // Ensure this matches your slice name
  },
});
console.log("Initial Store State:", store.getState()); // Logs the initial state

export default store;
