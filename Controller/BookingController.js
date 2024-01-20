const { db } = require("../db");
const Booking = db.bookings;

exports.createNew = async (req, res) => {
  try {
    console.log("Received booking request:", req.body);
    const newBooking = await Booking.create(req.body);
    console.log("Booking created:", newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Booking creation error:", error);
    if (error instanceof db.Sequelize.ValidationError) {
      res.status(400).send({ error: error.errors.map((item) => item.message) });
    } else {
      res.status(500).send({
        error: "Something has gone wrong. Our team is working to fix it.",
      });
    }
  }
};

exports.getAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: { all: true },
      logging: console.log,
    });

    let result = bookings.map((booking) => ({
      restaurantName: booking.restaurant.name,
      restaurantAddress: `${booking.restaurant.restaurant_addresses.streetAddress}`,
    }));

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
