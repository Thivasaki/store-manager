const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.listSales);
// router.get('/:id');
router.post('/', salesController.createSales);

module.exports = router;