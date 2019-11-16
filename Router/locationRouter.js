const express = require('express');
const router = express.Router();
const geoLocation = require('../Api/geocode');
const axios = require('axios');
const weather = require('../Api/weather');
const sendMessage = require('../Api/message');

router.post('/address', async (req,res) =>{ //returns the coordinates for an input address
    let response = await geoLocation(req.body.address);
    let long = response[1];
    let lat = response[0];  
    
    const bool = await weather(lat, long);
    const phone = "+16464062563";
    const sms = "the test message";
    if(bool)
    {
        sendMessage(phone, sms);
    }

    req.statusCode(200).send();
})

router.post("/gps", async (req, res) => {
    let long = req.body.longitude;
    let lat = req.body.latitude;

    const bool = await weather(lat, long);
    const phone = "+16464062563";
    const sms = "the test message";
    if(bool)
    {
        sendMessage(phone, sms);
    }

    req.statusCode(200).send();

});

module.exports = router;