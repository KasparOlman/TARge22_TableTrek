const { db } = require("../db");
const Booking = db.bookings;

exports.createNew = async (req, res) => {
  try {
    console.log("Received booking request:", req.body);

    // Ensure that required properties are present, or set default values
    const { booking_date, customer_name, booking_time } = req.body;


    const newBooking = await Booking.create({
      booking_date: booking_date,
      customer_name: customer_name,
      booking_time: booking_time,
    });

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
      // Add other properties as needed
    }));

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
