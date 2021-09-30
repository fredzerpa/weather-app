import AddressActionTypes from './address.types';

export const addAddress = address => ({
  type: AddressActionTypes.ADD_ADDRESS,
  payload: address,
});
