const express = require('express');
const router = express.Router();
const axios = require('axios');
const api = require('../Api');

router.post('/', async (req,res,next) =>{ //returns the route to destionation for one user
    let userPaths = [];
    for (let i = 0; i < req.body.newGroup.users.length; i++){
        let request = {
            user: req.body.newGroup.users[i],
            latitude: req.body.newGroup.latitude,
            longitude: req.body.newGroup.longitude
        }
        userPaths.push(await api(request));
    }
    res.status(200).send(userPaths);                 //must contain a response body so api works
})

module.exports = router;