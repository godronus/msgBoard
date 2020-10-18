import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import HttpException from '../../errorHandling/httpException';

export const createMessageValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    author: Joi.string(),
    message: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    next(new HttpException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
  } else {
    req.body = value;
    next();
  }
};

export default {
  createMessageValidation
}