import { Sequelize } from 'sequelize-typescript';

const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.NODE_ENV !== 'test' ? 'localhost' : 'localhost',
  port: process.env.NODE_ENV !== 'test' ? 3320 : 3321,
  username: 'root',
  password: '123456',
  database:
    process.env.NODE_ENV !== 'test' ? 'lojavirtual' : 'lojavirtual_test',
  logging: false,
});

export default connection;
