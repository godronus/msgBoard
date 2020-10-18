import express from './test-utils/express';
import database from './test-utils/database';

import { router as messageRouter } from '../src/routes/message/messageRoutes';

express.app.use("/", messageRouter);

beforeAll(async (done) => {
  await database.connect();
  done();
});

afterAll(async (done) => {
  await database.disconnect();
  done();
})

describe('/message - Route Handlers', () => {
  it('GET - should return empty array to start', (done) => {
    express.request(express.app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect([])
      .expect(200, done);
  });

  it('POST - with valid body should add new item to database', (done) => {
    express.request(express.app)
      .post('/')
      .type('form')
      .send({ message: 'Test Message from George', author: 'George' })
      .end((err, res) => {
        expect(res.status).toEqual(200)
        expect(res.body.author).toEqual('George')
        expect(res.body.message).toEqual('Test Message from George')
        expect(res.body.lastUpdated).toBeDefined()
        done();
      });
  });

  it('POST - without author in body should add new item to database (as anonymous)', (done) => {
    express.request(express.app)
      .post('/')
      .type('form')
      .send({ message: 'Test Message without Author' })
      .end((err, res) => {
        expect(res.status).toEqual(200)
        expect(res.body.author).toEqual('anonymous')
        expect(res.body.message).toEqual('Test Message without Author')
        expect(res.body.lastUpdated).toBeDefined()
        done();
      });
  });

  it('POST - without message should return an error', (done) => {
    express.request(express.app)
      .post('/')
      .type('form')
      .send({ author: 'Bad boy' })
      .end((err, res) => {
        expect(res.status).toEqual(400)
        expect(res.text.includes('Validation error')).toBeTruthy()
        done();
      });
  });

  it('GET - should return an array with 2 messages', (done) => {
    express.request(express.app)
      .get('/')
      .end((err, res) => {
        expect(res.body.length).toEqual(2);
        done();
      })
  });
});


