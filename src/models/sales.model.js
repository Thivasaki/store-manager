const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn.execute('SELECT * FROM sales_products');

  return result;
};

const insert = async (products) => {
  const [{ insertId }] = await conn
    .execute('INSERT INTO sales (date) VALUES (NOW())');
  const saleId = insertId;
  products.forEach(async ({ productId, quantity }) => {
    await conn
      .execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [saleId, productId, quantity]);
  });
  const result = {
    id: insertId,
    itemsSold: products,
  };
  return result;
};

module.exports = {
  findAll,
  insert,
};