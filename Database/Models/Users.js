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

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };
  return Joi.validate(user, schema);
}

// exports.users = users; // ------------------- module.exports
module.exports= Users;
