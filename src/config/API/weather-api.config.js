// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

export const getForecast = {
  fiveDaysThreeHours: {
    byCity: async (cityName = 'london') => {
      try {
        return await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast`,
          {
            params: { q: cityName, appid: env.WEATHER_API_KEY },
          }
        );
      } catch (error) {
        throw error;
      }
    },
    byCoords: async ({ lat, lon }) => {
      try {
        return await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast`,
          {
            params: { lat, lon, appid: env.WEATHER_API_KEY },
          }
        );
      } catch (error) {
        throw error;
      }
    },
  },
  currentWeather: async query => {
    try {
      return await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: { q: query, appid: env.WEATHER_API_KEY },
      });
    } catch (error) {
      throw error;
    }
  },
};