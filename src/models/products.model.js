const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products');

  return result;
};

const findById = async (id) => {
  const [result] = await conn.execute('SELECT * FROM StoreManager.products WHERE id = ?',
    [id]);
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await conn
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [product.name]);
  return insertId;
};

const updateProduct = async (id, product) => {
  await conn.execute('UPDATE products SET name = ? WHERE id = ?', [product, id]);
  const [patchedProduct] = await findById(id);
  return patchedProduct;
};

const deleteProduct = async (id) => {
  await conn.execute('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProduct,
  deleteProduct,
};