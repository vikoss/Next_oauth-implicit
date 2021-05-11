export default function isEmptyObject(object) {
  return (!Object.keys(object).length && object.constructor === Object);
};
