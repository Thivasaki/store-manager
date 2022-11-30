const validateProductIdField = (req, res, next) => {
  const saleArray = req.body;
  let missingInput = '';
  saleArray.forEach(({ productId }) => {
    if (!productId) {
      missingInput = 'productId';
    } 
  });
  if (missingInput === 'productId') {
    return res.status(400).json({ message: '"productId" is required' });
  }
  next();
};

const validateQuantityField = (req, res, next) => {
  const saleArray = req.body;
  let missingInput = '';
  saleArray.forEach(({ quantity }) => {
    if (!quantity && !Number(quantity) === 0) {
      missingInput = 'quantity';
    } 
  });
  if (missingInput === 'quantity') {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
  validateQuantityField,
  validateProductIdField,
};