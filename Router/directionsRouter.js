const express = require('express');
const router = express.Router();
const axios = require('axios');
const api = require('../Api');

router.post('/', async (req,res,next) =>{ //returns the route to destionation for one user
    let request = {
        user: req.body.newGroup.users[0],
        latitude: req.body.newGroup.latitude,
        longitude: req.body.newGroup.longitude
    }
    res.status(200).send(await api(request));                 //must contain a response body so api works
})

module.exports = router;