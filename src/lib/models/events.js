const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Events = sequelize.define("events", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  youtube_link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Events;
