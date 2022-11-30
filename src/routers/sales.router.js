const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSales);
router.get('/:id', salesController.getProductById);
router.post('/', salesController.createSales);

module.exports = router;