const Sequelize = require("sequelize");
const db = require("../db");

  const Groups = db.define("Groups", {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    longitude: {
      type: Sequelize.DECIMAL,
      allowNull: false
      // unique: true
    },
    latitude: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  });

module.exports = Groups;

