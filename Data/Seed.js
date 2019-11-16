// const Groups = require("../Database/Models/Groups");
// const Users = require("../Database/Models/Users");
// const Invitations = require('../Database/Models/Invitations');
// const Messages = require('../Database/Models/Messages');

const {Shelters} = require("../Database/Models/Shelters");

const shelters = require('./shelter');

const populateSheltersTable = async (shelters) => {
  for (let i = 0; i < shelters.length; i++) {
    let current = shelters[i];
    let builtShelter = await Shelters.create(current);
  }
}

const seedDatabase = async () => {
  try {
    await populateSheltersTable(shelters);

    console.log('database has been re-seeded');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = seedDatabase;