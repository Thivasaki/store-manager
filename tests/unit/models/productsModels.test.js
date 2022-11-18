const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const app = require('../../../src/app');
const conn = require('../../../src/models/db/connection')
const { expect, use } = chai;

use(chaiHttp);

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

describe('Testando o GET na rota "/products"', function () {
  beforeEach(function () {
    sinon.stub(conn, 'execute').resolves([mockDb])
  })

  afterEach(sinon.restore)

  it('Testar o retorno dos produtos sem especificar id', async function () {
    const res = await chai.request(app).get('/products')

    expect(res.status).to.be.equal(200);
    expect(res.body).to.deep.equal(mockDb);
    sinon.restore();
  })

  it('Testar o retorno dos produtos com id especificado', async function () {
    const outputExpect =
      {
        "id": 1,
        "name": "Martelo de Thor"
      };

    const res = await chai.request(app).get('/products/1')

    expect(res.status).to.be.equal(200);
    expect(res.body).to.deep.equal(outputExpect);
  })
  
  it('Testar o retorno dos produtos com id errado', async function () {
     const outputExpect =
      {
        "message": "Product not found"
      };

     const res = await chai.request(app).get('/products/6')

    expect(res.status).to.be.equal(404);
    expect(res.body).to.deep.equal(outputExpect);
  })
})