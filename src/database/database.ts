import mongoose from 'mongoose';

let database: mongoose.Connection;

export const connect = () => new Promise<void>((resolve, reject) => {
  const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds161653.mlab.com:61653/compare`;
  if (database) {
    return resolve();
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once("open", () => resolve());
  database.on("error", () => reject());
});

export const disconnect = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};

export default {
  connect,
  disconnect
}