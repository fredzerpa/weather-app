import AddressActionTypes from './address.types';
import { addAddressToAddresses } from './address.utils';

const INITIAL_STATE = {
  addresses: [],
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressActionTypes.ADD_ADDRESS:
      return {
        ...state,
        addresses: addAddressToAddresses(state.addresses, action.payload),
      };

    default:
      return state;
  }
};

export default addressReducer;
