function validateProductId(req, res, next) {
  if (Number(req.params.id) <= 3) {
    return next();
  }
  return res.status(404).send({ message: 'Product not found' });
}

module.exports = {
  validateProductId,
};