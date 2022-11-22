const express = require('express');

const router = express.Router();

const productRouter = require('./products.router');
const salesRouter = require('./sales.router');

router.use('/products', productRouter);
router.use('/sales', salesRouter);

module.exports = router;
