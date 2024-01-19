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
      booking_date: {
        type: Sequelize.DATE,
      },
      customer_name: {
        type: Sequelize.STRING,
      },
      booking_time: {
        type: Sequelize.TIME,
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
