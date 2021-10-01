// * Libraries
// + Axios
import axios from 'axios';
// + Moment
import moment from 'moment';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `https://api.openweathermap.org/data/2.5`;

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

const WEATHER_ICONS_MAP = {
  // -- Group 2xx: Thunderstorm
  Thunderstorm: {
    211: 'assets/weather-icons/thunder.svg', // Thunderstorm without Rain
    default: 'assets/weather-icons/thunder.svg',
  },
  // -- Group 3xx: Drizzle
  Drizzle: {
    default: 'assets/weather-icons/day-rain.svg',
  },
  // -- Group 5xx: Rain
  Rain: {
    default: 'assets/weather-icons/hail.svg',
  },
  // -- Group 6xx: Snow
  Snow: {
    default: 'assets/weather-icons/day-snow.svg',
  },
  // -- Group 7xx: Atmosphere
  Atmosphere: {
    default: null,
  },
  // -- Group 800: Clear
  Clear: {
    800: {
      // Clear
      day: 'assets/weather-icons/day.svg',
      night: 'assets/weather-icons/night.svg',
    },
    default: 'assets/weather-icons/day.svg',
  },
  // -- Group 80x: Clouds
  Clouds: {
    801: {
      // Few clouds
      day: 'assets/weather-icons/day-cloudy.svg',
      night: 'assets/weather-icons/night-cloudy.svg',
    },
    default: 'assets/weather-icons/cloudy.svg',
  },
};

export const getWeatherConditionIcon = (condition, code, time) => {
  const timeOfTheDay =
    6 <= moment(time).hours() && moment(time).hours() <= 19 ? 'day' : 'night';

  const iconLink = WEATHER_ICONS_MAP[condition][code]
    ? WEATHER_ICONS_MAP[condition][code][timeOfTheDay]
    : WEATHER_ICONS_MAP[condition][code] ??
      WEATHER_ICONS_MAP[condition].default;

  return iconLink;
};
