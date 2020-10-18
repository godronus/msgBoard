import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import { messageRouter } from './routes/index';
import database from './database/database';
import HttpException from './errorHandling/httpException';

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());

app.use(mongoSanitize({
  replaceWith: '_'
}))

app.use('/message', messageRouter);

app.use((error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res
    .status(status)
    .send({
      status,
      message,
    });
});

database.connect()
  .then(() => {
    console.log('Connected to database...')
    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  })
  .catch(() => console.error("Error connecting to database"));