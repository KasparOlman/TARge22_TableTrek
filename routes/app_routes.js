const restaurantsController = require("../Controller/RestaurantsController");

module.exports = (app) => {
  app
    .route("/restaurants")
    .get(restaurantsController.getAll)
    .post(restaurantsController.createNew);

  app
    .route("restaurants/:id")
    .put(restaurantsController.updateById)
    .get(restaurantsController.getById)
    .delete(restaurantsController.deleteById);
};
