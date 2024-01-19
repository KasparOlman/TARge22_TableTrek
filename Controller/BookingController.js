const { db } = require("../db");
const Booking = db.booking;
const restaurants = db.restaurants;

exports.getAll = async (req, res) => {
  const booking = await Booking.findAll({
    include: { all: true },
    logging: console.log,
  });
  console.log(booking);
  let result = [];
  result = booking.map((rb) => {
    return {
      restaurantName: rb.restaurant.name,
      restaurantAddress: `$(rb.restaurantaddress.streetAddress)`,
    };
  });
  res.send(result);
};
