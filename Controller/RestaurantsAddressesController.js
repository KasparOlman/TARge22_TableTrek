const { db } = require("../db");
const RestaurantsAddresses = db.restaurants_addresses;

exports.getAll = async (req, res) => {
  const restaurants_addresses = await RestaurantsAddresses.findAll({
    attributes: ["addresses_id"],
  });
  res.send(restaurants_addresses);
};
exports.getById = async (req, res) => {
  const restaurants_addresses = await RestaurantsAddresses.findByPk(
    req.params.id
  );

  if (restaurants_addresses === 0 || restaurants_addresses === undefined) {
    res.status(404).send({ error: "Resto address was not found" });
    return;
  } else {
    res.status(200).send(restaurants_addresses);
  }
};
exports.createNew = async (req, res) => {
  let restaurants_addresses;
  try {
    restaurants_addresses = await RestaurantsAddresses.create(req.body);
  } catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      console.log(error);
      res.status(400).send({ error: error.errors.map((item) => item.message) });
    } else {
      console.log("RestaurantAddressCreate: ", error);
      res.status(500).send({
        error:
          "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
      });
    }
    return;
  }
  res
    .status(201)
    .location(
      `${getBaseUrl(req)}/influencers/${restaurants_addresses.addresses.id}`
    )
    .json(restaurants_addresses);
  console.log(restaurants_addresses);
};
exports.deleteById = async (req, res) => {
  let result;
  try {
    result = await RestaurantsAddresses.destroy({
      where: { id: req.params.id },
    });
  } catch (error) {
    console.log("Resto address Delete: ", error);
    res.status(500).send({
      error:
        "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
    });
    return;
  }
  if (result === 0 || result === undefined) {
    res.status(404).send({ error: "Restaurant address was not found" });
  }
  res.status(204).send();
};

exports.updateById = async (req, res) => {
  let changed_restaurants_addresses;
  delete req.body.id;
  try {
    changed_restaurants_addresses = await RestaurantsAddresses.update(
      req.body,
      {
        where: { id: req.params.id },
      }
    );
  } catch (error) {
    console.log("Resto address Update: ", error);
    res.status(500).send({
      error:
        "Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up",
    });
    return;
  }
  if (
    changed_restaurants_addresses === 0 ||
    changed_restaurants_addresses === undefined
  ) {
    res.status(404).send({ error: "Influencer not found" });
    return;
  }
  const restaurants_addresses = await RestaurantsAddresses.findByPk(
    req.params.id
  );
  res
    .status(200)
    .location(
      `${getBaseUrl(req)}/INFLUENCERS/${
        restaurants_addresses.restaurants_addresses.id
      }`
    )
    .json(restaurants_addresses);
};

getBaseUrl = (request) => {
  return (
    (request.connection && request.connection.encryption ? "https" : "http") +
    `://${request.headers.host}`
  );
};
