import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { team, teams, TEAM_NOT_FOUND } from './mocks/team.mocks';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams tests', function () {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  afterEach(sinon.restore);

  it('01 - Retorna todos os times', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams');
    expect(status).to.be.eq(200);
    expect(body).to.deep.eq(teams);
  });

  it('02 - Retorna o time correspondente ao id informado', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.be.eq(200);
    expect(body).to.deep.eq(team);
  });

  it('03 - Retorna "Team not found" quando o id informado não existe', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/999');
    expect(status).to.be.eq(404);
    expect(body).to.deep.eq(TEAM_NOT_FOUND);
  });
});
