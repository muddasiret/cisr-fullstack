const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Programs = sequelize.define("programs", {
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
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  youtube: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  syllabus: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
  howtoapply: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
});

module.exports = Programs;
