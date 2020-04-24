const mongoose = require('mongoose');
const info = require('debug')('app:info:db');
const error = require('debug')('app:error:db');

mongoose.Promise = global.Promise;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
  dbName: 'test',
  user: 'root',
  pass: 'root'
};

mongoose.connection.on('disconnected', () => {
  error('MongoDB is disconnected');
});

mongoose.connection.on('reconnected', () => {
  info('MongoDB is reconnected');
});

const connect = async () => {
  await mongoose.connect('mongodb://mongo:27017', options);
  info('MongoDB is connected');
};

module.exports = connect;
