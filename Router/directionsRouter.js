const express = require('express');
const router = express.Router();
const api = require('../Api');
const geoLocation = require('../Geocode');

router.post('/', async (req,res,next) =>{ //returns the route to destionation for all user
    let userPaths = [];
    //console.log(req.body)
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        //console.log(addressDecoded);
        let request = {
            user: req.body.newGroup.users[i],
            latitude: req.body.newGroup.latitude,
            longitude: req.body.newGroup.longitude
        }
        console.log(request);
        userPaths.push(await api(request));
    }
    res.status(200).send(userPaths);                 //must contain a response body so api works
})

router.post('/address', async (req,res,next) =>{ //returns the route to destionation for all user
    let addresses = [];
    //console.log(req.body)
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        let addressDecoded = await geoLocation(req.body.newGroup.address);
        addresses.push(addressDecoded);
        //console.log(addressDecoded);
    }
    res.status(200).send(addresses);                 //must contain a response body so api works
})

module.exports = router;