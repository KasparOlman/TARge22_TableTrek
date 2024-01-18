const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
      timestamps: false,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.restaurants = require("./models/Restaurant.model")(sequelize, Sequelize);
//db.letsPlays = require("./models/LetsPlay.model")(sequelize,Sequelize)

async function Sync() {
  await sequelize.sync({ alter: true });
}

module.exports = { db, Sync };
