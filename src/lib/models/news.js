const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const News = sequelize.define("news", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  subtitle: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  youtube: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  pdf_text: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  pdf_link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = News;
