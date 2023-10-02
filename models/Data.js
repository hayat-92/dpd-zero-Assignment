const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Data = sequelize.define(
  "Data",
  {
    keyN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valueN: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Data;
