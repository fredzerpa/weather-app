// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `https://app.geocodeapi.io/api/v1`;

export const autocompleteAddress = {
  byCity: async cityName => {
    try {
      return await axios({
        method: 'GET',
        url: `${BASE_URL}/autocomplete`,
        headers: {
          apikey: env.GEOCODE_API_KEY,
        },
        params: {
          text: cityName,
          layers: 'locality',
        },
      });
    } catch (error) {
      throw error;
    }
  },
  byState: async state => {
    try {
      return await axios({
        method: 'GET',
        url: `${BASE_URL}/autocomplete`,
        headers: {
          apikey: env.GEOCODE_API_KEY,
        },
        params: {
          text: state,
          layers: 'region',
        },
      });
    } catch (error) {
      throw error;
    }
  },
  byCountry: async country => {
    try {
      return await axios({
        method: 'GET',
        url: `${BASE_URL}/autocomplete`,
        headers: {
          apikey: env.GEOCODE_API_KEY,
        },
        params: {
          text: country,
          layers: 'country',
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
