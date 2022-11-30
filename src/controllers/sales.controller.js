const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const listSales = async (_req, res) => {
  const { message } = await salesService.findAll();
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(200).json(message);
};

const createSales = async (req, res) => {
  const saleArray = req.body;
  const { type, message } = await salesService.createSale(saleArray);
  if (type) {
    return res.status(errorMap.mapError(type)).json({ message });
  }
  res.status(201).json(message);
};

module.exports = {
  listSales,
  getProductById,
  createSales,
};