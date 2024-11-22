import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "9067143c31e56a4701950f520f4dc8cd";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherIcons = {
  "01d": "clear",
  "01n": "clear",
  "11d": "snow",
  "11n": "snow",
  "04d": "drizzle",
  "04n": "drizzle",
  "10d": "rain",
  "09n": "rain",
  "09d": "rain",
  "02d": "cloud",
  "02n": "cloud",
  "03d": "cloud",
  "03n": "cloud",
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        alert("city not found");
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      const data = await response.json();

      // Map the weather icon code to the image name
      const iconCode = data.weather?.[0]?.icon;
      const weatherImage = weatherIcons[iconCode] || null;

      // Add `weatherImage` to the data
      return { ...data, weatherImage };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Includes `weatherImage` now
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;
