const errorMap = {
  'number.min': 422,
  'any.required': 400,
  'not.found': 404,
  'string.min': 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};