const chai = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models')
const conn = require('../../../src/models/connection')

const { expect } = chai;


describe('Testes de unidade do model de produtos', function () {

  afterEach(sinon.restore)

  it('Testar a busca dos produtos', async function () {
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
    sinon.stub(conn, 'execute').resolves([mockDb]);

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(mockDb);
  })

  it('Testar a busca dos produtos com id especificado', async function () {
    const outputExpect =
      {
        "id": 1,
        "name": "Martelo de Thor"
      };

    sinon.stub(conn, 'execute').resolves([outputExpect])
    const result = await productModel.findById();

    expect(result).to.deep.equal(outputExpect);
  })

  it('Testar o retorno dos produtos sem especificar id', async function () {
    const mockDb = {
      "name": "ProdutoX"
    };
    sinon.stub(conn, 'execute').resolves([{ insertId: 4 }]);

    const result = await productModel.insert(mockDb);

    expect(result).to.be.deep.equal(4);
  })
})