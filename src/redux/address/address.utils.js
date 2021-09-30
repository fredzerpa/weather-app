export const addNewAddress = (addresses, addressToAdd) => {
  if (existingAddress(addresses, addressToAdd)) {
    return addresses;
  }

  return [...addresses, addressToAdd];
};

export const removeExistingAddress = (addresses, addressToRemove) =>
  addresses.filter(address => address.city !== addressToRemove.city);

export const existingAddress = (addresses, addressToAdd) =>
  addresses.find(address => address.city === addressToAdd.city);
