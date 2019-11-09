const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:rainbow@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

db.sync()
  .then(() => Movie.truncate())
  .then(() => {
    Movie.bulkCreate([
      {
        title: "Léon: The Professional",
        yearsOfRelease: 1994,
        synopsis:
          "When 12-year-old Mathilda's family is killed, her neighbour Leon, who is a professional assassin, reluctantly takes her under his wing and teaches her the secrets of his trade."
      },
      {
        title: "The Elephant Man",
        yearsOfRelease: 1980,
        synopsis:
          "The Elephant Man is a 1980 historical drama film about Joseph Merrick, a severely deformed man in late 19th century London."
      },
      {
        title: "Manchester by the Sea",
        yearsOfRelease: 2016,
        synopsis:
          "After his brother's death, Lee Chandler is named guardian to his 16-year-old nephew, Patrick. This forces him to return to his hometown and confront his past."
      }
    ]);
  })
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

module.exports = db;
