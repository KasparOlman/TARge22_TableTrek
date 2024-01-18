require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
//const port = 8080;
const port = process.env.APP_PORT;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use(cors());
app.use(express.json());
require("./routes/app_routes")(app);

app.get("/errors", async (req, res) => {
  res.status(404).send({ error: "something went wrong" });
});

app.get("/restaurants/:id", (req, res) => {
  if (typeof restaurants[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Restaurant not found" });
  }
  res.send(restaurants[req.params.id - 1]);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/restaurants", (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    return res
      .status(400)
      .send({ error: "One or all parameters that are required is missing" });
  }
  let restaurant = {
    id: restaurants.length + 1,
    price: req.body.price,
    name: req.body.name,
  };
  restaurants.push(restaurants);
  res
    .status(201)
    .location(`${getBaseUrl(req)}/restaurants/${restaurants.length}`)
    .send(restaurant);
});

app.delete("/restaurants/:id", (req, res) => {
  if (typeof restaurants[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "restaurants not found" });
  }
  restaurants.splice(req.params.id - 1, 1);
  res.status(204).send({ error: "No Content" });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, async () => console.log(`API up at http://localhost:${port}`));

function getBaseUrl(req) {
  return req.connection && req.connection.encrypted
    ? "https"
    : "http" + `://${req.headers.host}`;
}
