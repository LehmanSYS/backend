const express = require("express");
const app = express();
const apiRouter = require("./Router/apiRouter");
const bodyParser = require("body-parser");
const PORT = 4000;
const db = require("./Database");
const seed = require('./Data/Seed');
const config = require("config");
const auth = require("./Middlewares/authMid");

// if (!config.get("jwtKey")) {     //dsadsa
//   console.error("Config Error: jwtKey is not defined.");
//   process.exit(1);
// }

//Force: true basically wipes the local database clean.
//this file is only run once, when the app is started.
db.sync({ force: false }).then(async () => {
  //seed();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use("/api", apiRouter);
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});
