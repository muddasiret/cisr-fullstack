const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Programmes = sequelize.define("programmes", {
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
  type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  youtube_link: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  body: {
    type: Sequelize.TEXT,
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
  faculty: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    allowNull: true,
  }
});

module.exports = Programmes;
