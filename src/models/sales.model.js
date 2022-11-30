const conn = require('./connection');

const findAll = async () => {
  const [result] = await conn
    .execute(`SELECT
    sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id;`);

  return result;
};

const findById = async (id) => {
  const [result] = await conn
    .execute(`SELECT
    s.date, sp.product_id AS productId, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?`, [id]);
  console.log(result);

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
  findById,
  insert,
};