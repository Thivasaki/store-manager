const { expect } = require('chai');
const { findAll, findById } = require('../../../src/services/product.service');

describe('Verificar validações de values do services', function () {
  it('Busca por todos os produtos', async function () {
    const output = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ];

    const allProducts = await findAll()

    expect(allProducts.message).to.deep.equal(output)
  })

  it('Busca por produto com id inválido', async function () {
     const output = 'INVALID_VALUE';

    const product = await findById('xablau')

    expect(product.type).to.deep.equal(output)
  })

  it('Busca de um id inexistente na lista de produtos', async function () {
    const output = 'PRODUCT_NOT_FOUND';

    const product = await findById(34)

    expect(product.type).to.deep.equal(output)
  })

  it('Busca de produto por id', async function () {
    const output = {
        "id": 1,
        "name": "Martelo de Thor"
      };

    const product = await findById(1)

    expect(product.message).to.deep.equal(output)
  })

})