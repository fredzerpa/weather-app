import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import addressReducer from './address/address.reducer';
import favoritesReducer from './favorites/favorites.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  address: addressReducer,
  favorites: favoritesReducer,
});

export default persistReducer(persistConfig, rootReducer);
