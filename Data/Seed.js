const db = require('../Database');
const Promise = require('bluebird');

const Groups = require("../Database/Models/Groups");
const Users = require("../Database/Models/Users");

let usersArray = [
    {
      name: "Elon Musk",
      email: 'elon@musk.com',
      password: 'teslaRoadster',
      image:
        "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images/artworkimages/medium/1/elon-musk-greg-joens.jpg?&targetx=0&targety=-98&imagewidth=787&imageheight=985&modelwidth=788&modelheight=788&backgroundcolor=F8F8F8&orientation=0",
      long: -73.985954,
      lat: 40.756814
    },
    {
      name: "Barack Obama",
      email: '44@president.com',
      password: 'blackJesus',
      image: "https://images-na.ssl-images-amazon.com/images/I/51NuSfifT-L.jpg",
      long: -73.986276,
      lat: 40.757322
    },
    {
      name: "Neil Tyson",
      email: 'neilT@nasa.gov',
      password: '123',
      image:
        "https://render.fineartamerica.com/images/rendered/default/flat/round-beach-towel/images-medium-5/neil-degrasse-tyson-dan-sproul.jpg?&targetx=-131&targety=0&imagewidth=1050&imageheight=788&modelwidth=788&modelheight=788&backgroundcolor=070C11&orientation=0",
      long: -73.986576,
      lat: 40.756124
    },
    {
      name: "User 4",
      email: 'spam@gmail.com',
      password: '7654321',
      image:
        "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
      long: -73.985477,
      lat: 40.770125
    },
    {
      name: "User 5",
      email: 'hacker@yahoo.com',
      password: '1aA2DA31Hsdh$',
      image:
        "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1",
      long: -73.985329,
      lat: 40.740532
    }
  ];
  
  let groupsArray = [
    {
      name: "Group 1",
      latitude: 40.231347,
      longitude: -70.453215 
    },
    {
      name: "Group 2",
      latitude: 40.211234,
      longitude: -70.123456
    }
  ];

module.exports = async() => {db.sync({force: true})
.then(()=> console.log("wiped old data, Refreshing database"))
.then(async() => {
    return await Promise.map(groupsArray, (group) =>{
        return Groups.create(group);
    })
})
.then(async() => {
    return await Promise.map(usersArray, (user) =>{
        return Users.create(user);
    })
})
.catch(err =>{console.log(err)})
.finally(() =>{
    db.close();
    console.log('Finished!');
    return null;
})

}