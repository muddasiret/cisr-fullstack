const { Sequelize } = require("sequelize");

const sequelize = require("./index");

const Book = sequelize.define("book", {
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
  author: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Book;
