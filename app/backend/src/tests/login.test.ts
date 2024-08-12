import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import loginService from '../Services/loginService';
import UserModel from '../database/models/UserModel';
import userMock from './mocks/userMock';


chai.use(chaiHttp);
const { expect } = chai;

describe('LoginController - Testes de integração', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('POST /login invalid error:', async function() {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const res = await chai.request(app).post('/login').send({
      email: 'wrong@example.com',
      password: 'password123',
    });

    expect(res.status).to.equal(401);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  // it('GET /login/role succesful:', async function() {
  //   sinon.stub(jwt, 'verify').callsFake(() => ({ id: 1 }));
  //   sinon.stub(UserModel, 'findByPk').resolves(userMock as UserModel);

  //   const res = await chai.request(app)
  //   .get('/login/role')
  //   .set('Authorization', 'Bearer valid_token');

    

  //   expect(res.status).to.equal(200);
  //   expect(res.body).to.deep.equal({ role: 'admin' });
  // });
});
