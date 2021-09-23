// * Libraries
// + Axios
import axios from 'axios';
// + Environment Variables
import env from 'react-dotenv';

const BASE_URL = `https://api.unsplash.com`;

const INITIAL_CONFIG = {
  backupSearch: false,
  backupKeyword: null,
};

export const searchPhotosByKeyword = async (
  keyword,
  config = INITIAL_CONFIG
) => {
  let response;
  try {
    response = await axios({
      method: 'GET',
      url: `${BASE_URL}/search/photos`,
      params: {
        query: keyword,
        client_id: env.UNSPLASH_ACCESS_KEY,
        per_page: '30',
        // Orientation landscape to maximize the opportunity of the photo to be a lanscape
        orientation: 'landscape',
      },
    });

    // TODO Make a new request over the former if the former response is empty
    if (!response.data.results.length && config.backupSearch) {
      try {
        response = await axios({
          method: 'GET',
          url: `${BASE_URL}/search/photos`,
          params: {
            query: config.backupKeyword,
            client_id: env.UNSPLASH_ACCESS_KEY,
            per_page: '30',
            // Orientation landscape to maximize the opportunity of the photo to be a lanscape
            orientation: 'landscape',
          },
        });
      } catch (error) {
        throw error;
      }
    }
    return { response };
  } catch (error) {
    throw error;
  }
};
