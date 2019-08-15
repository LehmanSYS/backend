const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router2 = express.Router();
const { users } = require("../Database/Models/Users");

router2.post("/", async (req, res) => {
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await users.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Invalid email or password.");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid email or password.");
  //   console.log(valid);

  res.send("login successful");
});

function validate(req) {
  const schema = {
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
  return Joi.validate(req, schema);
}

module.exports = router2;
