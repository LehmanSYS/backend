const db = require('../Database');
const Promise = require('bluebird');

const Groups = require("../Database/Models/Groups");
const Users = require("../Database/Models/Users");

function getRand(max){
    return Math.floor(Math.random()* max);
}

let allUsers,
    allGroups;

let findAllPromises = [
    Users.findAll().then(users => allUsers = users),
    Groups.findAll().then(groups => allGroups = groups)
]

module.exports = () => {db.sync({force: false})
.then(() => {
    return Promise.all(findAllPromises)
})
.then(allFound => {
    let userPromises = allUsers.map( user => {
        let randUsers = [allUsers[getRand(allUsers.length)],allUsers[getRand(allUsers.length)]];
        return user.setGroups(randUsers);
    })
    return Promise.all(userPromises);
})
.then( groupsAdded => {
    let groupPromise = allGroups.map( group => {
        let randGroup = [allGroups[getRand(allGroups.length)]];
        return newUser.setUsers(randGroup);
    })
    return Promise.all(groupPromise);
})
.catch(err => console.log(err))
.finally(() =>{
    console.log('Finished adding associations');
    db.close();
    return null;
})
}   