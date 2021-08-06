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
        throw error.response;
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
        console.error(error);
      }
    },
  },
  currentWeather: async query => {
    try {
      return await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: { q: query, appid: env.WEATHER_API_KEY },
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export const getOpenWeatherImage = async (codeOpenWeatherImage, size = 2) => {
  const response = await axios.get(
    `http://openweathermap.org/img/wn/${codeOpenWeatherImage}@${size}x.png`,
    {
      responseType: 'arraybuffer',
    }
  );
  const buffer = Buffer.from(response.data, 'binary').toString('base64');
  console.log(buffer);

  return buffer;
};
