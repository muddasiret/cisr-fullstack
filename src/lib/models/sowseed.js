const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Sowseed = sequelize.define("sowseed", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  day: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Sowseed;
