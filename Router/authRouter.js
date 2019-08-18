const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router2 = express.Router();
const config = require("config");
const users = require("../Database/Models/Users");

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

router2.post("/", async (req, res) => { 
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(users);
  let user = await users.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send("Invalid email or password");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(400).send("Invalid email or password");
  //   console.log(valid);

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    "myJwtKey"
    // config.get("jwtKey")
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router2;
