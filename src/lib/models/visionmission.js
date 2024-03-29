const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Visionmission = sequelize.define("visionmission", {
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
  body: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Visionmission;
