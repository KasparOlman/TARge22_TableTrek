module.exports = (sequelize, Sequelize) => {
  const Restaurant = sequelize.define("restaurant", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });

  return Restaurant;
};
