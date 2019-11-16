const express = require('express');
const router = express.Router();
const weather = require('../Api/weather');
const axios = require('axios');



router.get("/", async (req,res) =>{
    var lat = "40.829659";
    var long = "-73.926186";
    //await weather(lat,long);
})

module.exports = router;
