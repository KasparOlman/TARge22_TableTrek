require("dotenv").config();
const mariadb = require("mariadb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

app.use(cors());
app.use(express.json());

const restaurants = [
  {
    id: 1,
    name: "Art Priori",
    price: "$$",
  },
  {
    id: 2,
    name: "La Cuccina",
    price: "$$$",
  },
  {
    id: 3,
    name: "Fotografiska",
    price: "$$",
  },
  {
    id: 4,
    name: "Lee",
    price: "$$$",
  },
  {
    id: 5,
    name: "Noa",
    price: "$$$",
  },
  {
    id: 6,
    name: "NCH",
    price: "$$$$",
  },
  {
    id: 7,
    name: "Barbarea",
    price: "$$",
  },
];

app.get("/restaurants", (req, res) => {
  res.send(restaurants);
});

app.get("/restaurants/:id", (req, res) => {
  if (typeof restaurants[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Restaurant not found." });
  }
  res.send(restaurants[req.params.id - 1]);
});

app.post("/restaurants", (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).send({ error: "Name and price are required." });
  }

  const newRestaurant = {
    id: restaurants.length + 1,
    name: req.body.name,
    price: req.body.price,
  };

  restaurants.push(newRestaurant);

  res.status(201).send(newRestaurant);
});

app.delete("/restaurants/:id", (req, res) => {
  if (typeof restaurants[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Restaurant not found." });
  }

  restaurants.splice(req.params.id - 1, 1);

  res.status(204).send({ error: "Restaurant deleted." });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, async () => console.log(`API up at http://localhost:${port}`));

function getBaseUri(req) {
  return req.connection && req.connection.encrypted
    ? "https"
    : "http" + `://${req.headers.host}`;
}
