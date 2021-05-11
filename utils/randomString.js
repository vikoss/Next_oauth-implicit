export default function randomString(stringLength) {
  let randomString = '';
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvw1234567890';

  for (let index = 0; index <= stringLength; index++) {
    randomString += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return randomString;
};
