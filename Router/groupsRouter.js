const express = require("express");
const router = express.Router();
const Groups = require("../Database/Models/Groups");
const Users = require("../Database/Models/Users");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

router.get("/", (req, res, next) => { // get all groups
  Groups.findAll({ include: { model: Users } })
    .then(res.send.bind(res))
    .catch(next)
});

router.get('/:name', (req, res, next) => { //get database by NAME
  Groups.findAll({
    where: { name: req.params.name },
    include: { model: Users }
  })
    .then(group => {
      if (!isEmpty(group)) {
        res.status(200).send(group);
      }
      else {
        res.status(404).send();
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => { //Add new group to database
  Groups.findOrCreate({
    where: req.body.newGroup
  })
    .then(groups => {
      if(groups[1])
      {
        res.status(200).send(groups);
      }
      else
      {
        res.status(400).send();
        console.log('Group Already Exists');
      }
    })
    .catch(next)
});

// router.post('/', (req,res,next) =>{   //associate users to a group
//   Groups.findAll({where: {name : req.params.name}})
//   .then(group =>{
//     //
//   })
//   .catch(err => console.log(err))
// })

router.delete('/:name', async (req, res, next) => {   //delete a group
  await Groups.findAll({ where: { name: req.params.name } })
    .then(async group => {
      if (!isEmpty(group)) {
        await Groups.destroy({ where: { name: req.params.name } })
        console.log('Group Destroyed');

        await Groups.findAll({ include: { model: Users } })
          .then(groups => {
            res.status(200).send(groups);
          })
          .catch(err => console.log(err))
      }
      else {
        res.status(404).send();
      }
    })
})

module.exports = router;
