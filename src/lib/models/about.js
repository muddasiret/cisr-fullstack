const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const About = sequelize.define("about", {
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
  body: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = About;
