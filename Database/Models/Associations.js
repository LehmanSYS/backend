const groups = require("./Groups");
const users = require("./Users");

//Associations between tables, to link primary keys to foreign keys
// students.belongsTo(campus);
// campus.hasMany(students);

users.belongsToMany(groups);
groups.belongsToMany(user);

module.exports = {
  users,
  groups
};
