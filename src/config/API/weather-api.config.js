// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

export const getForecast = {
  fiveDaysThreeHours: async query =>
    await axios.get(`http://api.openweathermap.org/data/2.5/forecast`, {
      params: { q: query, appid: env.WEATHER_API_KEY },
    }),
  currentWeather: async query =>
    await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
      params: { q: query, appid: env.WEATHER_API_KEY },
    }),
};
