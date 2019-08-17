const Sequalize = require("sequelize");
const db = require("../db");
const Joi = require("joi");

const groups = db.define("groups", {
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

// function validateUser(user) {
//   const schema = {
//     name: Joi.string()
//       .min(3)
//       .max(50)
//       .required(),
//     email: Joi.string()
//       .min(5)
//       .max(255)
//       .required()
//       .email(),
//     password: Joi.string()
//       .min(5)
//       .max(1024)
//       .required()
//   };
//   return Joi.validate(user, schema);
// }
// exports.validate = validateUser;

module.exports = groups; // ------------------- module.exports
