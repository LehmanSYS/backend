const express = require("express");
const app = express();
const PORT = 4000;

const http = require('http');
const server = http.Server(app);//app.listen(PORT, () => console.log(`Sockets & Server are running on Port ${PORT}`))
const io = require('socket.io')(server);//(server);  //Socket component
server.listen(PORT);
console.log(`Sockets & Server are running on Port ${PORT}`);

const groupH = require('./Socket/GroupHandler');
const groupHandler = new groupH;
module.exports = groupHandler;
require('./Socket')(io);

const apiRouter = require("./Router/apiRouter");
const bodyParser = require("body-parser");
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
});
