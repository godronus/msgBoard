import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.urlencoded({ extended: false }));

export default {
  app,
  request
}