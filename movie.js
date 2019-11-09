const Sequelize = require("sequelize");
const db = require("./db");

const Movie = db.define("movie", {
  title: Sequelize.TEXT,
  yearsOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT
});

module.exports = Movie;
