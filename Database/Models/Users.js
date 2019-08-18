const Sequelize = require("sequelize");
const db = require("../db");
const Joi = require("joi");

  const Users = db.define("Users", {
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    long: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    lat: {
      type: Sequelize.DECIMAL,
      allowNull: false
    }
  });
// exports.users = users; // ------------------- module.exports
module.exports= Users;
