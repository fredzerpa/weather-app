import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import addressReducer from './address/address.reducer';

const favoritesPersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  addresses: persistReducer(favoritesPersistConfig, addressReducer),
});

export default rootReducer;
