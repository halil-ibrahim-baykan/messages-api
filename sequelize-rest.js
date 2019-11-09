// const { Router } = require("express");
// const Movie = require("./movie");

// const router = new Router();
// router.post("/movies", (req, res, next) => {
//   console.log(req.body);
//   Movie.create(req.body)
//     .then(movie => {
//       res.status(201).send(movie);
//     })
//     .catch(err => next(err));
// });

// router.get("/movies", (req, res, next) => {
//   Movie.findAll()
//     .then(movie => res.status(200).json(movie))
//     .catch(err => next(err));
// });

// router.get("/movies/:id", (req, res, next) => {
//   Movie.findByPk(req.params.id)
//     .then(movie => res.status(200).json(movie))
//     .catch(err => next(err));
// });
// router.put("/movies/:id", (req, res, next) => {
//   Movie.findByPk(req.params.id)
//     .then(movie => movie.update(req.body))
//     .then(updatedMovie => res.status(200).send(updatedMovie))
//     .catch(err => next(err));
// });
// router.delete("/movies/:id", (req, res, next) => {
//   Movie.destroy({ where: { id: req.params.id } })
//     .then(numberOfMoviesDeleted => {
//       if (numberOfMoviesDeleted === 0) {
//         res.status(404).send({ message: "Movie not found" });
//       } else {
//         res.status(204).send({ message: "Movie deleted" });
//       }
//     })
//     .catch(err => next(err));
// });

// module.exports = router;

const { Router } = require("express");
const Sequelize = require("sequelize");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:rainbow@localhost:5432/postgres";

const db = new Sequelize(databaseUrl);

const Movie = db.define("movie", {
  title: Sequelize.TEXT,
  yearsOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT
});

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

const router = new Router();
router.post("/movies", (req, res, next) => {
  console.log(req.body);
  Movie.create(req.body)
    .then(movie => {
      res.status(201).send(movie);
    })
    .catch(err => next(err));
});

router.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movie => res.status(200).json(movie))
    .catch(err => next(err));
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => res.status(200).json(movie))
    .catch(err => next(err));
});
router.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => movie.update(req.body))
    .then(updatedMovie => res.status(200).send(updatedMovie))
    .catch(err => next(err));
});
router.delete("/movies/:id", (req, res, next) => {
  Movie.destroy({ where: { id: req.params.id } })
    .then(numberOfDeletedMovies => {
      if (numberOfDeletedMovies === 0) {
        res.status(404).send({ message: "Movie not found" });
      } else {
        res.status(204).send({ message: "Movie deleted" });
      }
    })
    .catch(err => next(err));
});

module.exports.movieRouter = router;
module.exports.Movie = Movie;
