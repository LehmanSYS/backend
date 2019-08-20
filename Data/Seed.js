const Groups = require("../Database/Models/Groups");
const Users = require("../Database/Models/Users");

const groups = require('./groups');
const users = require('./users');

const builtUsersArr = [];
const builtGroupArr = [];
function getRandomInt(x) {
  return Math.floor((Math.random() * x) + 1);
}

const populateUsersTable = async (users) => {
  for (let i = 0; i < users.length; i++) {
    let current = users[i];
    let builtUser = await Users.create(current);
    builtUsersArr.push(builtUser);
  }
}

const populateGroupsTable = async (groups) => {
  for (let i = 0; i < groups.length; i++) {
    let current = groups[i];
    let builtGroup = await Groups.create(current);
    builtGroupArr.push(builtGroup);
  }
}

const associateUsersTable = async () => {
  for (let i = 0; i < builtUsersArr.length; i++) {
    let current = builtUsersArr[i];
    await current.addGroups(getRandomInt(2));
  }
}

const associateGroupsTable = async () => {
  for (let i = 0; i < builtGroupArr.length; i++) {
    let current = builtGroupArr[i];
    await current.addUsers(getRandomInt(5));

  }
}

const seedDatabase = async () => {
  try {
    await populateUsersTable(users);
    //await populateGroupsTable(groups);
    //await associateUsersTable();
    //await associateGroupsTable();
    console.log('database has been re-seeded');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = seedDatabase;