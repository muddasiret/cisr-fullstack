const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Profiles = sequelize.define("profiles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  designation: {
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
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Profiles;
