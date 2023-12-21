const restaurantsController = require("..controller/RestaurantsController.js");

module.exports = (app) => {
  app.route("/restaurants").get(restaurantsController.getAll);

  app.route("restaurants/:id").get(restaurantsController.getById);
};
