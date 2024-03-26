const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("./index");

const Home = sequelize.define("home", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  specifications: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
});

module.exports = Home;
