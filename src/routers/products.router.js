const express = require('express');
const { productController } = require('../controllers');
const { validateProductId } = require('../middlewares/productsValidation');

const router = express.Router();

router.get('/', productController.listProducts);
router.get('/:id', validateProductId, productController.getProductById);

module.exports = router;