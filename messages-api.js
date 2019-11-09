const express = require("express");
const bodyParser = require("body-parser");
const movieRouter = require("./sequelize-rest");

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

let count = 0;

const countMiddleware = (req, res, next) => {
  if (count > 5) {
    res.status(429).send("Too Many Requests");
  } else {
    next();
  }
  count++;
};

app.use(jsonParser);
app.use(movieRouter);

app.post("/messages", countMiddleware, (req, res) => {
  console.log(req.body);
  if (!req.body.text || req.body.text === "") {
    res.status(400).send("Bad Request");
  } else {
    res.status(201).json("message: Messaged received loud and clear");
  }
});

app.listen(port, () => console.log("Server is running on port: " + port));
