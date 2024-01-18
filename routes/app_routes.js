const restaurantsController = require("../Controller/RestaurantsController.js");
const AddressesController = require("../Controller/AddressesController.js");
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
    .get(AddressesController.getAll)
    .post(AddressesController.createNew);

  app
    .route("/Addresses/:addressId")
    .get(AddressesController.getById)
    .put(AddressesController.updateById)
    .delete(AddressesController.deleteById);
};
