const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Project = sequelize.define("project", {
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
  title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  team: {
    type: Sequelize.ARRAY(Sequelize.JSONB),
    allowNull: true,
  },
});

module.exports = Project;
