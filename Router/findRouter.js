const express = require("express");
const router = express.Router();
const axios = require('axios');
const Shelters = require('../Database/Models/Shelters.js')

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

router.get("/", (req, res) => {
  res.status(200).send("Ye");
});

let findInRange = async (lat, long, data, range) => {
  const answer = []
  //console.log(data)
  const lat1 = parseFloat(lat)
  const long1 = parseFloat(long)
  let num = 0
  for (var i = 0; i < data.length; i++) {
    const lat2 = parseFloat(data[i].latitude)
    const long2 = parseFloat(data[i].longitude)
    if (distance(lat1, long1, lat2, long2, "N") <= range) {
      //console.log(num)
      num+=1
      answer.push(data[i])
    }
  }
  console.log(answer.length)
  return answer
}

router.put("/local", async (req, res) => {
  console.log("localhost:4000/api/find/local: ", req.body.lat, req.body.long)
  const lat = req.body.lat
  const long = req.body.long
  let data = await Shelters.findAll({ raw: true })
  .catch(err => res.send(err))
  const filtered_data = await findInRange(lat, long, data, 2)
  //console.log("YO", filtered_data)
  res.send(filtered_data)
});

module.exports = router;