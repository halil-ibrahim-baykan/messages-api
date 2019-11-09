const express = require("express");
const bodyParser = require("body-parser");
const { Movie, movieRouter } = require("./sequelize-rest");
const cors = require("cors");

const app = express();
const port = 3000;
const corsMiddleware = cors();
const jsonParser = bodyParser.json();

app.use(corsMiddleware);
app.use(jsonParser);
app.use(movieRouter);

app.post("/messages", (req, res) => {
  console.log(req.body);
  res.json("message: Messaged receive loud and clear");
});

app.listen(port, () => console.log("Server is running on port: " + port));
