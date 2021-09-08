// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `https://api.unsplash.com`;

export const searchPhotosByKeyword = async keyword => {
  try {
    return await axios({
      method: 'GET',
      url: `${BASE_URL}/search/photos`,
      params: {
        query: keyword,
        client_id: env.UNSPLASH_ACCESS_KEY,
        per_page: '30',
      },
    });
  } catch (error) {
    throw error;
  }
};
