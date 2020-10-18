import { model, Schema } from 'mongoose';

import { IMessageDocument } from "./messageTypes";

export const MessageSchema = new Schema({
  author: {
    type: String,
    default: 'anonymous'
  },
  message: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

const MessageModel = model<IMessageDocument>('message', MessageSchema);

export default MessageModel;