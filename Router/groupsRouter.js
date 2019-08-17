const express = require("express");
const router = express.Router();
const groups = require("../Database/Models/Groups");

router.get("/", async (req, res) => {
  let all = await groups.findAll();
  res.status(200).send(all);
});

module.exports = router;
