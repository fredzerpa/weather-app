import AddressActionTypes from './address.types';

export const addAddressToSearchedAddresses = address => ({
  type: AddressActionTypes.ADD_ADDRESS_TO_SEARCHED_ADDRESSES,
  payload: address,
});

export const addAddressToFavorites = address => ({
  type: AddressActionTypes.ADD_ADDRESS_TO_FAVORITES,
  payload: address,
});

export const removeAddressFromFavorites = address => ({
  type: AddressActionTypes.REMOVE_ADDRESS_FROM_FAVORITES,
  payload: address,
});

export const removeAddress = address => ({
  type: AddressActionTypes.REMOVE_ADDRESS,
  payload: address,
});
