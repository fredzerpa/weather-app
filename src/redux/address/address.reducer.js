import AddressActionTypes from './address.types';
import {
  addNewAddress,
  existingAddress,
  removeExistingAddress,
} from './address.utils';

const INITIAL_STATE = {
  searchedAddresses: [],
  favorites: [],
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressActionTypes.ADD_ADDRESS_TO_SEARCHED_ADDRESSES:
      return {
        ...state,
        favorites: state.favorites,
        searchedAddresses: existingAddress(state.favorites, action.payload)
          ? state.searchedAddresses
          : addNewAddress(state.searchedAddresses, action.payload),
      };

    case AddressActionTypes.ADD_ADDRESS_TO_FAVORITES:
      return {
        ...state,
        searchedAddresses: removeExistingAddress(
          state.searchedAddresses,
          action.payload
        ),
        favorites: addNewAddress(state.favorites, action.payload),
      };

    case AddressActionTypes.REMOVE_ADDRESS_FROM_FAVORITES:
      return {
        ...state,
        searchedAddresses: addNewAddress(
          state.searchedAddresses,
          action.payload
        ),
        favorites: removeExistingAddress(state.favorites, action.payload),
      };

    default:
      return state;
  }
};

export default addressReducer;
