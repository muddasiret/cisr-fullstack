const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Bottomcards = sequelize.define("bottomcards", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  subtitle: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Bottomcards;
