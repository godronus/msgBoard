import express, { NextFunction, Request, Response } from 'express';
import { messageController } from '../../controllers';
import { createMessageValidation } from './messageValidation';

export const router = express.Router({
    strict: true
});

router.post('/', createMessageValidation, (req: Request, res: Response, next: NextFunction) => {
  messageController.create(req, res, next);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  messageController.read(req, res, next);
});

router.patch('/', (req: Request, res: Response, next: NextFunction) => {
  messageController.update(req, res, next);
});

router.delete('/', (req: Request, res: Response, next: NextFunction) => {
  messageController.delete(req, res, next);
});