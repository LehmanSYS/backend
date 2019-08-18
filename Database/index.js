
const db = require("./db");

module.exports = db;

const Groups = require("./Models/Groups");
const Users = require("./Models/Users");

Groups.belongsToMany(Users, {through: 'GroupUsers'});
Users.belongsToMany(Groups, {through: 'GroupUsers'});

