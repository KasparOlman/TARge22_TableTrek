module.exports = (sequelize, Sequelize, Restaurant, Address) => {
  const RestaurantsAddresses = sequelize.define("restaurantAddresses", {
    addresses_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    streetAddress: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
  });
  return RestaurantsAddresses;
};
