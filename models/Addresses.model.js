module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    addressId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoincrement: true,
    },
    streetAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return Address;
};
