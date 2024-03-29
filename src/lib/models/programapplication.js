const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const ProgramApplication = sequelize.define("programapplication", {
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
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  qualification: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  course: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  file: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = ProgramApplication;
