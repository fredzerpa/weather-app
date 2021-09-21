export const convertFarenheitToCelcius = temp => (temp - 32) * (5 / 9);

export const getRandomNumber = (maxNumber = 1) =>
  Math.floor(Math.random() * maxNumber);

export const getUserGeoLocation = async () => {
  // ! Is promise function which will return the userLocation
  if (!('geolocation' in navigator)) {
    return 'Geolocation is not available on this device';
  }
  const askUserLocation = () =>
    // * It's a promise so we can get the value in other sections of the code
    new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    });
  const userLocation = await askUserLocation();
  return userLocation;
};

export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator.language
) => first.toLocaleUpperCase(locale) + rest.join('');
