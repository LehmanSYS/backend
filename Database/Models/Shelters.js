const Sequelize = require("sequelize");
const db = require("../db");

  const Shelters = db.define("Shelters", {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    longitude: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    latitude: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  });

module.exports = Shelters;

