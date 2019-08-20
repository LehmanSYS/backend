
const db = require("./db");

const Groups = require("./Models/Groups");
const Users = require("./Models/Users");

Groups.belongsToMany(Users, {through: 'GroupUsers'});
Users.belongsToMany(Groups, {through: 'GroupUsers'});

module.exports = {db,Groups,Users};
