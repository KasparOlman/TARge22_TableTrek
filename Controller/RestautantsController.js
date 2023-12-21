const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});
const db = require("../db");
const Restaurant = db.restaurant;

exports.getAll = async (req, res) => {
  const restaurants = await Restaurant.findAll({
    attributes: ["id", "name", "price"],
  });
  res.send(restaurants);
};

exports.getById = async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  res.send(restaurant);
};
