const express = require('express');
const { productController } = require('../controllers');
const validateNewProductFields = require('../middlewares/validateNewProductFields');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);
router.post('/', validateNewProductFields, productController.createProducts);
router.put('/:id', productController.requestUpdateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;