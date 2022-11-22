const { expect } = require('chai');
const sinon = require('sinon')

const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models')

describe('Testes de unidade do service dos produtos', function () {
  afterEach(sinon.restore)
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
    sinon.stub(productModel, 'findAll').resolves(output)

    const allProducts = await productService.findAll()

    expect(allProducts.message).to.deep.equal(output)
  })

  it('Busca por produto com id inválido', async function () {
     const output = 'INVALID_VALUE';

    const product = await productService.findById('xablau')

    expect(product.type).to.deep.equal(output)
  })

  it('Busca de um id inexistente na lista de produtos', async function () {
    const output = 'PRODUCT_NOT_FOUND';
    sinon.stub(productModel, 'findById').resolves([])

    const product = await productService.findById(34)

    expect(product.type).to.deep.equal(output)
  })

  it('Busca de produto por id', async function () {
    const output = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    sinon.stub(productModel, 'findById').resolves([output])

    const product = await productService.findById(1)

    expect(product.type).to.be.null
    expect(product.message).to.deep.equal(output)
  })

  it('Adicionando produto', async function () {
    const output = {
      "id": 4,
      "name": "ProdutoX"
    };
    sinon.stub(productModel, 'insert').resolves(output.name);
    sinon.stub(productModel, 'findById').resolves([output]);

    const product = await productService.createProduct(output.name);

    expect(product.type).to.be.null;
    expect(product.message).to.deep.equal(output);
  })

  it('Falha em adicionar um produto', async function () {
    const output = 'INVALID_VALUE';

    const product = await productService.createProduct('x')

    expect(product.type).to.deep.equal(output)
  })

})