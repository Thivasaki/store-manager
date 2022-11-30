const { salesModel, productModel } = require('../models');
const { validateNewSalesFields, validateId } = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) {
    return error;
  }
  const sale = await salesModel.findById(id);
  if (sale.length > 0) {
    return { type: null, message: sale };
  }
  return { type: 'not.found', message: 'Sale not found' };
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
  findById,
  createSale,
};