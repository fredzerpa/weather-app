export const convertFarenheitToCelcius = temp => (temp - 32) * (5 / 9);

export const getRandomNumber = (maxNumber = 1) =>
  Math.floor(Math.random() * maxNumber);