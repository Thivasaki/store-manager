const express = require('express');
// const { salesController } = require('../controllers');
// const validateNewSalesFields = require('../middlewares/validateNewSalesFields');

const router = express.Router();

router.get('/');
router.get('/:id');
router.post('/');

module.exports = router;