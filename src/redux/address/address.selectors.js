import { createSelector } from 'reselect';

const selectAddresses = state => state.addresses;

export const selectSearchedAddresses = createSelector(
  [selectAddresses],
  addresses => addresses.searchedAddresses
);

export const selectFavoriteAddresses = createSelector(
  [selectAddresses],
  addresses => addresses.favorites
)
