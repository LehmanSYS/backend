const Sequelize = require("sequelize");
const db = require("../db");

  const Groups = db.define("Groups", {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    street: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    state: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    zip: {
      type: Sequelize.TEXT,
      allowNull: true
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

  // Groups.prototype.associate = function(user){
  //   this.addUsers(user);
  // }
module.exports = Groups;

