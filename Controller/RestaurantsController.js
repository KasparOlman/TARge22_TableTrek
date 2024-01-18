const { db } = require("../db");
const Restaurant = db.restaurants;

exports.getAll = async (req, res) => {
  const restaurants = await Restaurant.findAll({
    attributes: ["id", "name", "price"],
  });
  res.send(restaurants);
};

exports.getById = async (req, res) => {
  const restaurants = await Restaurant.findByPk(req.params.id);
  res.send(restaurants);
};

exports.createNew = async (req, res) => {
  let restaurant;
  try {
    restaurant = await Restaurant.create(req.body);
  } catch (error) {
    if (error instanceof db.Sequelize.ValidationError) {
      console.log(error);
      res.status(400).send({ error: error.errors.map((item) => item.message) });
    } else {
      console.log("RestaurantsCreate: ", error);
      res.status(500).send({ error: "Something has gone wrong " });
    }
    return;
  }
  res
    .status(201)
    .location(`${getBaseUrl(req)}/restaurants/${restaurant.id}`)
    .json(restaurant);
  console.log(restaurant);
};

exports.deleteById = async (req, res) => {
  let result;
  try {
    result = await Restaurant.destroy({ where: { id: req.params.id } });
  } catch (error) {
    console.log("RestaurantsDelete: ", error);
    res.status(500).send({ error: "Something has gone wrong" });
    return;
  }
  if (result === 0) {
    res.status(404).send({ error: "Restaurant not found" });
    return;
  }
  res.status(204).send();
};

exports.updateById = async (req, res) => {
  try {
    const restaurant = await Restaurant.update(req.body);

    res.status(201).location(`${getBaseUrl(req)}/restaurants/${restaurant.id}`);

    console.log(restaurant);

    res.send(restaurant);
  } catch (error) {
    console.error(error);

    res.status(400).send("Invalid input");
  }
  const restaurant = await Restaurant.findByPk(req.params.id);
  res
    .status(200)
    .location(`${getBaseUrl(req)}/restaurants/${restaurant.id}`)
    .json(restaurant);
};
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await db.restaurants.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getRestaurants,
};

getBaseUrl = (request) => {
  return `${
    request.connection && request.connection.encrypted ? "https" : "http"
  }://${request.headers.host}`;
};
