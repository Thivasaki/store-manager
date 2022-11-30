const { idSchema, addProductSchema, addSalesSchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    const [{ type }] = error.details;
    console.log(type);
    return { type, message: error.message };
  }
  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) {
    const [{ type }] = error.details;
    return { type, message: error.message };
  }
  return { type: null, message: '' };
};

const validateNewSalesFields = (saleArray) => {
  const { error } = addSalesSchema.validate(saleArray);
  if (error) {
    const newMessage = `"${error.message.split('[0].')[1]}`;
    const [{ type }] = error.details;
    return { type, message: newMessage };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSalesFields,
};