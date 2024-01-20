module.exports = (sequelize, Sequelize, Restaurant, RestaurantAddress) => {
  const Booking = sequelize.define("booking", {
    booking_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    restaurant_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Restaurant,
        key: "id",
      },
    },
    addresses_id: {
      type: Sequelize.INTEGER,
      references: {
        model: RestaurantAddress,
        key: "id",
      },
    },
    booking_date: {
      type: Sequelize.DATE,
    },
    customer_name: {
      type: Sequelize.STRING,
    },
    booking_time: {
      type: Sequelize.TIME,
    },
  });

  // Assotsiatsioonid
  Restaurant.belongsToMany(RestaurantAddress, { through: Booking });
  RestaurantAddress.belongsToMany(Restaurant, { through: Booking });
  Restaurant.hasMany(Booking, { foreignKey: "restaurant_id" });
  Booking.belongsTo(Restaurant, { foreignKey: "restaurant_id" });
  RestaurantAddress.hasMany(Booking, { foreignKey: "addresses_id" });
  Booking.belongsTo(RestaurantAddress, { foreignKey: "addresses_id" });

  return Booking;
};
