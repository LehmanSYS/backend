const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router2 = express.Router();
const auth = require("../Middlewares/authMid");
const Joi = require("joi");
const {Groups} = require("../Database");
const {Users} = require("../Database");

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
      .required(),
    long: Joi.number(),
    lat: Joi.number()
  };
  return Joi.validate(user, schema);
}

router2.post("/", async (req, res) => {
  //auth,
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await users.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already registered.");

  //console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  //console.log(req.body);

  let new_user = await users.create(req.body);
  //console.log("created: ", new_user);
  const token = jwt.sign(
    {
      id: new_user.id,
      name: new_user.name,
      email: new_user.email
    },
    "myJwtKey"
    // config.get("jwtKey")
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(new_user, ["id", "name", "email"]));
});

router2.get("/", async (req, res) => {
  //console.log(users);
  let all = await Users.findAll({include: [{model: Groups}]});
  return res.status(200).send(all);
});

module.exports = router2;
