const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productController } = require('../../../src/controllers')
const { productService } = require('../../../src/services')


describe('Tesets de unidade do controller de produtos', function () {
  afterEach(sinon.restore)
  it('Listagem de todos os produtos', async function () {
    const res = {};
    const req = {};
    const mockDb = [
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

    const positiveResponse = {
      type: null,
      message: mockDb,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
    sinon.stub(productService, 'findAll').resolves(positiveResponse)

    await productController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockDb);

  })

  it('Busca de produto por id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    const mockDb =
      {
        "id": 1,
        "name": "Martelo de Thor"
      };

    const positiveResponse = {
      type: null,
      message: mockDb,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
    sinon.stub(productService, 'findById').resolves(positiveResponse)

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockDb);

  })

  it('Falha na busca de produto por id', async function () {
    const res = {};
    const req = {
      params: { id: 'xablau' },
    };
    const mockRes = {
      message: 'Product not found'
    }
    const negativeType = 'PRODUCT_NOT_FOUND'
    const negativeMenssage = 'Product not found';
    const negativeResponse = {
      type: negativeType,
      message: negativeMenssage,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()
    sinon.stub(productService, 'findById').resolves(negativeResponse)

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(mockRes);
  })
});