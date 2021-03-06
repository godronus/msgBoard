import { NextFunction, Request, Response } from 'express';

export abstract class CrudController {
  abstract create(req: Request, res: Response, next: NextFunction): Promise<void>;
  abstract read(req: Request, res: Response, next: NextFunction): Promise<void>;
  abstract update(req: Request, res: Response, next: NextFunction): Promise<void>;
  abstract delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}