const { productModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) {
    return error;
  }
  const [product] = await productModel.findById(id);
  if (product) {
    return { type: null, message: product };
  }
  return { type: 'not.found', message: 'Product not found' };
};

const createProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error.type) {
    return error;
  }
  const newProductId = await productModel.insert({ name });
  const [newProduct] = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const errorId = validateId(id);
  const errorName = validateNewProduct(name);
  if (errorId.type) {
    return errorId;
  } if (errorName.type) {
    return errorName;
  }

  const [product] = await productModel.findById(id);
  if (!product) {
    return { type: 'not.found', message: 'Product not found' };
  }
  
  const updatedProduct = await productModel.updateProduct(id, name);

  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};