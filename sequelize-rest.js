const { Router } = require("express");
const Movie = require("./movie");

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
    .then(numberOfMoviesDeleted => {
      if (numberOfMoviesDeleted === 0) {
        res.status(404).send({ message: "Movie not found" });
      } else {
        res.status(204).send({ message: "Movie deleted" });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
