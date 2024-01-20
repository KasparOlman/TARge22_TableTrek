const restaurantsController = require("../Controller/RestaurantsController.js");
const RestaurantsAddresses = require("../Controller/RestaurantsAddressesController.js");
const Booking = require("../Controller/BookingController");
module.exports = (app) => {
  app
    .route("/restaurants")
    .get(restaurantsController.getAll)
    .post(restaurantsController.createNew);

  app
    .route("/restaurants/:id")
    .put(restaurantsController.updateById)
    .get(restaurantsController.getById)
    .delete(restaurantsController.deleteById);

  app
    .route("/RestaurantsAddresses")
    .get(RestaurantsAddresses.getAll)
    .post(RestaurantsAddresses.createNew);

  app
    .route("/RestaurantsAddresses/:addresses_id")
    .get(RestaurantsAddresses.getById)
    .put(RestaurantsAddresses.updateById)
    .delete(RestaurantsAddresses.deleteById);

  app.route("/bookings").get(Booking.getAll).post(Booking.createNew);
};
