const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models');
const { expect } = chai;
const { userMock,
   validUserLogin,
   createValidUser,
   invalidEmail,
   invalidPassword,
   createInvalidEmail,
   createInvalidPassword, 
   userInfosMock,
   invalidToken} = require('./mocks/UserMock');

chai.use(chaiHttp);

describe('POST /login', function () {
  let chaiHttpResponse;

  afterEach(() => sinon.restore());
it('Testa se é possível fazer login com sucesso', async function () {
  sinon.stub(User, 'findOne').resolves(userMock)
  chaiHttpResponse = await chai.request(app)
  .post('/login')
  .send(validUserLogin)

  expect(chaiHttpResponse.status).to.be.deep.eq(200);
});

it('Testa se não é possível fazer login com senha incorreta', async function () {
  sinon.stub(User, 'findOne').resolves();
  
  chaiHttpResponse = await chai.request(app)
  .post('/login')
  .send(invalidPassword);

  expect(chaiHttpResponse.status).to.be.eq(404);
});

it('Testa se não é possível fazer login com email incorreto', async function () {
  sinon.stub(User, 'findOne').resolves();
  
  chaiHttpResponse = await chai.request(app)
  .post('/login')
  .send(invalidEmail);

  expect(chaiHttpResponse.status).to.be.eq(404);
});
});

describe('POST /user', function () {
  let chaiHttpResponse;

  afterEach(() => sinon.restore());
  it('Testa se é possivel cadastrar usuário com sucesso', async function () {
    sinon.stub(User, 'create').resolves(createValidUser);

    chaiHttpResponse = await chai.request(app)
    .post('/user')
    .send(createValidUser);


    expect(chaiHttpResponse.status).to.be.equal(201);
  });

  it('Testa se não é possivel cadastrar usuário com senha inválida', async function () {
    sinon.stub(User, 'create').resolves();

    chaiHttpResponse = await chai.request(app)
    .post('/user')
    .send(createInvalidEmail);


    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal("\"email\" must be a valid email");
  });

  it('Testa se não é possivel cadastrar usuário com senha inválida', async function () {
    sinon.stub(User, 'create').resolves();

    chaiHttpResponse = await chai.request(app)
    .post('/user')
    .send(createInvalidPassword);


    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal("\"password\" length must be at least 6 characters long")
  });
});

describe('GET /user', function() {
  let chaiHttpResponse;

  afterEach(() => sinon.restore());


  it('Testa se é possivel fazer requisição com sucesso', async function () {
    const { body: { token } } = await chai.request(app)
    .post('/login')
    .send(validUserLogin);

    sinon.stub(User, 'findOne').resolves(userInfosMock);

    chaiHttpResponse = await chai.request(app)
    .get('/user/1')
    .set('authorization', token)
    .send({});

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.deep.eq(userInfosMock);
  });

  it('Testa se NÃO é possível fazer requisição com token inválido', async function() {
    sinon.stub(User, 'findOne').resolves(userInfosMock);

    chaiHttpResponse = await chai.request(app)
    .get('/user/1')
    .set('authorization', invalidToken)
    .send({})

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.deep.eq('Expired or invalid token');
  });

  it('Testa se NÃO é possível fazer requisição sem token', async function() {
    sinon.stub(User, 'findOne').resolves(userInfosMock);

    chaiHttpResponse = await chai.request(app)
    .get('/user/1')
    .send({})

    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.body.message).to.be.deep.eq('Token not found');
  });


});