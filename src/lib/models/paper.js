const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Paper = sequelize.define("paper", {
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
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pdf_link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Paper;
