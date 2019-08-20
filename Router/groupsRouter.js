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
  Groups.findAll({ include: [{all: true}] })
    .then(res.send.bind(res))
    .catch(next)
});

router.get('/:id', (req, res, next) => { //get database by NAME
  Groups.findByPk(req.params.id)
    .then(group => {
      if (!isEmpty(group)) {
        res.status(200).send(group.name);
      }
      else {
        res.status(404).send();
      }
    })
    .catch(next)
});

router.post('/', (req, res, next) => { //Add new group to database //SET ASSOCIATIONS OR USERS
  Groups.findAll({
    where: {name:req.body.name}
  })
    .then(async group => {
      if(isEmpty(group)){
        for(let i =0; i < req.body.users.length; i++)
        {
          let user = null;
          await Users.findByPk(req.body.users[i].id)
          .then(res => {
            //console.log(res);
            user = res
          })
          .catch(err => console.log(err))  
          // console.group(user);
          // group.setUsers(user);
        }
        res.status(200).send(group);
      }
      else
      {
        res.status(400).send();
        console.log('Group Already Exists');
      }  
    })
    .catch(next)
});

router.post('/addUsers', (req,res,next) =>{   //associate users to a group
  let group = null;
  Groups.findByPk(req.body.groupId)
  .then(res => group = res)
  .catch(err => console.log(err))

  Users.findByPk(req.body.id)
  .then(user =>{
      user.addGroups(group);
  })
  .catch(err => console.log(err))
})

router.post('/removeUser', (req,res,next) =>{   //req is reciving login info 
  let user = null;
  Users.findByPk(req.body.id)
  .then(res => {
    user = res;
  })
  .catch(err => console.log(err))

  Groups.findByPk(req.body.groupId)
  .then(group =>{
      group.removeUsers(user);
  })
  .catch(err => console.log(err))
})

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
