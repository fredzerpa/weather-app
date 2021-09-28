import AddressActionTypes from './address.types';

export const setAddress = address => ({
  type: AddressActionTypes.SET_ADDRESS,
  payload: address,
});
