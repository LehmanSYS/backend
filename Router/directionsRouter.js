const express = require('express');
const router = express.Router();
const axios = require('axios');
const api = require('../Api');

router.get('/', (req,res,next) =>{ //returns the route to destionation for one user
    await axios.get(req)            //must contain a response body so api works
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(404).send(err);
    })
})