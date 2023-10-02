// config/db.js
const Sequelize = require("sequelize");

const sequelize = new Sequelize("mydatabase", "root", "root", {
  host: "db",
  dialect: "mysql",
});

module.exports = sequelize;
