const { salesModel, productModel } = require('../models');
const { validateNewSalesFields } = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { type: null, message: products };
};

const createSale = async (saleArray) => {
  const error = validateNewSalesFields(saleArray);
  if (error.type) {
    return error;
  }

  const missingProduct = await Promise.all(saleArray
    .map(({ productId }) => productModel.findById(productId)));
  
  if (missingProduct.some((product) => typeof product[0] === 'undefined')) {
     return { type: 'not.found', message: 'Product not found' };
  }

  const newSale = await salesModel.insert(saleArray);

  return { type: null, message: newSale };
};

module.exports = {
  findAll,
  createSale,
};