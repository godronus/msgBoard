import { Document, Model } from 'mongoose';

export interface IMessage {
  author?: string;
  message: string;
  lastUpdated?: Date;
}

export interface IMessageDocument extends IMessage, Document {}
export interface IMessageModel extends Model<IMessageDocument> {}