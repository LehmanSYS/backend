const express = require("express");
const router = express.Router();
const Groups = require("../Database/Models/Groups");
const Users = require("../Database/Models/Users");

router.get("/", (req, res, next) => {
  Groups.findAll()
    .then(res.send.bind(res))
    .catch(next)
});

router.get('/:name', (req, res, next) => {
  Groups.findByPk(req.params.name, {
    include: {model: Users}
  })
    .then(res.send.bind(res))
    .catch(next)
});

router.post('/', (req, res, next) => {
  Groups.findOrCreate({
    where: req.body
  })
  .then( res.send.bind(res))
  .catch(next)
});

module.exports = router;
