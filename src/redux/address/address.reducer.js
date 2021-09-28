import AddressActionTypes from './address.types';

const INITIAL_STATE = {
  addressData: null,
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AddressActionTypes.SET_ADDRESS:
      return {
        ...state,
        addressData: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;