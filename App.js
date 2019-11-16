const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App is running on Port ${PORT}`))

const apiRouter = require("./Router/apiRouter");
const bodyParser = require("body-parser");
const db = require("./Database/db");
const seed = require('./Data/Seed');
const cors = require('cors');
 
//Force: true wipes the database clean.
//this file is only run once, when the app is started.
db.sync({ force: false }).then(async () => {
  //seed();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors()); // <---- use cors middleware

  app.use("/api", apiRouter);
});
