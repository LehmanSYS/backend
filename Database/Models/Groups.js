const Sequalize = require("sequelize");
const db = require("../db");

  const Groups = db.define("Groups", {
    name: {
      type: Sequalize.STRING,
      allowNull: false
    },
    longitude: {
      type: Sequalize.DECIMAL,
      allowNull: false
      // unique: true
    },
    latitude: {
      type: Sequalize.DECIMAL,
      allowNull: false
    }
  });

module.exports = Groups;

