const express = require('express');
const { findAll, findById } = require('./models/db/productsDb');
const { validateProductId } = require('./middlewares/productsValidation');

const app = express();

app.get('/products', async (req, res) => {
  const products = await findAll();

  return res.status(200).json(products);
});

app.get('/products/:id', validateProductId, async (req, res) => {
  const { id } = req.params;
  const [products] = await findById(id);

  return res.status(200).json(products);
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;