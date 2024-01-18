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
      res.status(500).send({
        error:
          "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
      });
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
    res.status(500).send({
      error:
        "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
    });
    return;
  }
  if (result === 0) {
    res.status(404).send({ error: "Resto not found" });
    return;
  }
  res.status(204).send();
};

exports.updateById = async (req, res) => {
  let result;
  delete req.body.id;
  try {
    result = await Restaurant.update(req.body, {
      where: { id: req.params.id },
    });
  } catch (error) {
    console.log("RestaurantsUpdate: ", error);
    res.status(500).send({
      error:
        "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
    });
    return;
  }
  if (result === 0) {
    res.status(404).send({ error: "Resto not found" });
    return;
  }
  const restaurant = await Restaurant.findByPk(req.params.id);
  res
    .status(200)
    .location(`${getBaseUrl(req)}/restaurants/${restaurant.id}`)
    .json(restaurant);
};

getBaseUrl = (request) => {
  return `${
    request.connection && request.connection.encrypted ? "https" : "http"
  }://${request.headers.host}`;
};
