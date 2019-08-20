const express = require('express');
const router = express.Router();
const geoLocation = require('../Geocode');

router.post('/', async (req,res,next) =>{ //returns the route to destionation for all user
    let userPaths = [];
    let address = req.body.address;
    let addressDecoded = await geoLocation(req.body.newGroup.address);    
})

router.post('/address', async (req,res,next) =>{ //returns the route to destionation for all user
    let addre = [];
    //console.log(req.body)
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        //console.log(addressDecoded);
    }
    res.status(200).send(userPaths);                 //must contain a response body so api works
})

module.exports = router;