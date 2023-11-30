const express = require("express");
const app = express();
const port = 8080;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const restaurants = [
  {
    id: 0,
    name: "Select a restaurant",
    price: "?",
  },
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
    id: 6,
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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`API up at http://localhost:${port}`));
