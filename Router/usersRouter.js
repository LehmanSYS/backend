const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const router2 = express.Router();
const { users, validate } = require("../Database/index");
const auth = require("../Middlewares/authMid");

router2.post("/", async (req, res) => {
  //auth,
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await users.findOne({ where: { email: req.body.email } });
  if (user) return res.status(400).send("User already registered.");

  console.log(req.body);
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  console.log(req.body);

  let new_user = await users.create(req.body);
  console.log("created: ", new_user);
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
  console.log(users);
  let all = await users.findAll();
  return res.status(200).send(all);
});

module.exports = router2;
