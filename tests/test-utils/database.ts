import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

export const connect = () => new Promise<void>((resolve, reject) => {
  mongoose.Promise = Promise;
  mongoServer.getUri().then(mongoUri => {
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on("error", e => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
      reject();
    });

    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
      resolve();
    });
  });
});

export const disconnect = () => new Promise<void>(async (resolve, reject) => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
    resolve()
  } catch (error) {
    reject()
  }
})

export default {
  connect,
  disconnect
}