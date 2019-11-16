const express = require("express");
const router = express.Router();
const axios = require('axios');

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


router.post("/local", async (req, res) => {
  MongoClient.connect(url, async (err, client) => {
    if (err) throw err;
    const data = await axios.get(
      "https://data.cityofnewyork.us/api/views/addd-ji6a/rows.json"
    );
    const shelters_ = data.data.data;
    const db = client.db("shelters");
    const collection = db.collection("run1");

    collection.findOne({ name: "run2" }, (err, item) => {
      console.log(item);
    });

    client.close();
  });
});

module.exports = router;
