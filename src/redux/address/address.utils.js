export const addAddressToAddresses = (addresses, addressToAdd) => {
  const existingAddress = addresses.find(
    address => address.city === addressToAdd.city
  );

  if (existingAddress) {
    return addresses;
  }

  return [...addresses, addressToAdd];
};
