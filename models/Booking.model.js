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
  });
  Restaurant.belongsToMany(RestaurantAddress, { through: Booking });
  RestaurantAddress.belongsToMany(Restaurant, { through: Booking });
  Restaurant.hasMany(Booking);
  Booking.belongsTo(Restaurant);
  RestaurantAddress.hasMany(Booking);
  Booking.belongsTo(RestaurantAddress);
  return Booking;
};
