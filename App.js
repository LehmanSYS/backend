const express = require("express");
const app = express();
const PORT = 4000;

const http = require('http');
const server = http.Server(app);//app.listen(PORT, () => console.log(`Sockets & Server are running on Port ${PORT}`))
const io = require('socket.io')(server);//(server);  //Socket component
server.listen(PORT);
console.log(`Sockets & Server are running on Port ${PORT}`);
//console.log(io);
const groupH = require('./Socket/GroupHandler');
const groupHandler = new groupH;
const api = require('./Api');
//module.exports = gh;

io.on('connection', function (socket) {
  console.log(`${socket.id} has connected to the server`);

  socket.on('create', async (formData) => {
      let roomName = formData.name;
      console.log(`attempting to create ${roomName}`)
      if (!groupHandler.exists(roomName)) {
          groupHandler.addGroup(formData);
          socket.join(roomName);
          socket.emit('success-group-made',formData);
          console.log(`${socket.id} has joined and create ${roomName}`)
          for(let i = 0; i< formData.users.length; i++)
          {
              let request = {
                  user: formData.users[i],
                  latitude: formData.latitude,
                  longitude: formData.longitude
              }
              socket.emit('route', await api(request));
          }
      }
      else {
          console.log("Room already exists");
      }
  });

  socket.on('disconnect', function(){
      console.log('user disconnected');
  });

  socket.on('update', (roomName) => {
      let data = []; //user routes to destination
      io.sockets.in(roomName).emit('routes', data);
  });
});
//const initSocket = require('./Socket');

// function isFunction(functionToCheck) {
//   return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
//  }

// if(isFunction(initSocket))
// {
//   initSocket(io);
// }


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
