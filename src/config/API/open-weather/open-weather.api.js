// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `http://api.openweathermap.org/data/2.5`;

export const getForecast = {
  fiveDaysThreeHours: {
    byCity: async cityName => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/forecast`,
          params: {
            q: cityName,
            appid: env.WEATHER_API_KEY,
            units: 'imperial',
          },
        });
        return { results: data };
      } catch (error) {
        throw error;
      }
    },
    byCoords: async ({ lat, lon }) => {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/forecast`,
          params: { lat, lon, appid: env.WEATHER_API_KEY, units: 'imperial' },
        });
        return { results: data };
      } catch (error) {
        throw error;
      }
    },
  },
  currentWeather: async query => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${BASE_URL}/weather`,
        params: { q: query, appid: env.WEATHER_API_KEY, units: 'imperial' },
      });
      return { results: data };
    } catch (error) {
      throw error;
    }
  },
};
