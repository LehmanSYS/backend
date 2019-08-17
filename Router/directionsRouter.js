const express = require('express');
const router = express.Router();
import axios from 'axios';

router.get('/', (req,res) =>{
    let url = 'https://maps.googleapis.com/maps/api/directions/json?'+
    'origin=40.768176,-73.96485&'+ //USERS LATITUDE, LONGITUDE HERE
    'destination=' + this.state.lat + ',' + this.state.lon + '&'+
    '&mode=transit&key=' + process.env.API_KEY;
    await axios.get(url)
    .then(r => {
        res.status(200).send(r);
    })
    .catch(e => {
        res.status(404).send(e);
    })
})