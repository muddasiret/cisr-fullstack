const { Sequelize } = require("sequelize");

const connectionObject = {
  host: process.env.POSTGRES_DATABASE_HOST,
  dialect: process.env.DIALECT,
};

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE_USERNAME,
  process.env.POSTGRES_DATABASE_USERNAME,
  process.env.POSTGRES_DATABASE_PASSWORD,
  connectionObject
);

module.exports = sequelize;
