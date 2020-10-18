import { NextFunction, Request, Response } from 'express';
import { CrudController } from '../crudController';
import MessageModel from '../../database/message/messageModel';
import HttpException from '../../errorHandling/httpException';


export class MessageController extends CrudController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { author, message } = req.body;
      const newMessage = await MessageModel.create({
        author: author || 'anonymous',
        message
      });
      res.json(newMessage);
    } catch (error) {
      next(new HttpException(404, 'Error Creating Message'));
    }
  }

  async read(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const allMessages = await MessageModel.find();
      res.json(allMessages);
    } catch (error) {
      next(new HttpException(404, 'Error Fetching Messages'));
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
      throw new Error("Method not implemented.");
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
      throw new Error("Method not implemented.");
  }
}