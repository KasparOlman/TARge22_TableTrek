const restaurantsController = require("../Controller/RestaurantsController.js");
const RestaurantsAddressesController = require("../Controller/RestaurantsAddressesController.js");
const BookingController = require("../Controller/BookingController");
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
    .route("/Addresses")
    .get(RestaurantsAddressesController.getAll)
    .post(RestaurantsAddressesController.createNew);

  app
    .route("/Addresses/:addressId")
    .get(RestaurantsAddressesController.getById)
    .put(RestaurantsAddressesController.updateById)
    .delete(RestaurantsAddressesController.deleteById);
  app.route("/booking").post(BookingController.getAll);
};
