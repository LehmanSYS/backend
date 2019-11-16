const express = require('express');
const router = express.Router();
const geoLocation = require('../Api/geocode');
const axios = require('axios');

router.post('/address', async (req,res) =>{ //returns the coordinates for an input address
    let response = await geoLocation(req.body.address);
    let long = response[1];
    let lat = response[0];         
})

router.post("/gps", async (req, res) => {
    let long = res.longitude;
    let lat = res.latitude;
});

module.exports = router;