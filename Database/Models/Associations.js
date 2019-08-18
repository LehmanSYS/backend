const Groups = require('./Groups');
const {Users} = require('./Users');

Groups.belongsToMany(Users, {through: 'GroupUsers'});
Users.belongsToMany(Groups, {through: 'GroupUsers'});

module.exports = {
    Groups,
    Users
}