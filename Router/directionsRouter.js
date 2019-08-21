const express = require('express');
const router = express.Router();
const api = require('../Api');
const geoLocation = require('../Api/geocode');

router.post('/', async (req,res) =>{ //returns the route to destionation for all user
    let userPaths = [];
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        let request = {
            user: req.body.newGroup.users[i],
            latitude: req.body.newGroup.latitude,
            longitude: req.body.newGroup.longitude
        }
        userPaths.push(await api(request));
    }
    res.status(200).send(userPaths);                 
})

router.post('/address', async (req,res) =>{ //returns the coordinates for an input address
    let addressDecoded = await geoLocation(req.body.address);
    res.status(200).send(addressDecoded);          
})

module.exports = router;