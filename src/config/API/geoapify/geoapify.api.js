// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `https://api.geoapify.com/v1/geocode`;

export const autocompleteAddress = {
  byCity: async (cityName, cancelToken) => {
    try {
      const data = await axios(
        {
          method: 'GET',
          url: `${BASE_URL}/autocomplete`,
          params: {
            apiKey: env.GEOAPIFY_API_KEY,
            text: cityName,
            type: 'city',
            limit: '5',
          },
        },
        // Pass the cancel token to the current request
        { cancelToken: cancelToken.token }
      );
      return { results: data };
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
