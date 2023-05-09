const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { allProductsMock } = require('./mocks/productsMock')
const { Product } = require('../database/models');
const { validUserLogin } = require('./mocks/UserMock');
const { expect } = require('chai');

chai.use(chaiHttp);


describe('GET /products', function() {
  let chaiHttpResponse;
  let authorization = '';

  afterEach(() => sinon.restore()); 

  beforeEach(async () => {
    const { body: { token } } = await chai
    .request(app)
    .post('/login')
    .send(validUserLogin)

    authorization = token;
  })
  it('Testa se é possível listar todos os produtos', async function() {
    sinon.stub(Product, 'findAll').resolves(allProductsMock);

    chaiHttpResponse = await chai
    .request(app)
    .get('/products')
    .set('authorization', authorization)
    .send({})

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(allProductsMock);
  })
});