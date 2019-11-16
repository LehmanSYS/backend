
const {Shelters} = require("../Database/index");
const schools = require('./rows.js').data;
const fallout = require('./fallout')["Sheet 1"];


const populateFalloutTable = async (fallout) => {
  for (let i = 0; i < fallout.length; i++) {
    let current = fallout[i];
    let builtShelter = await Shelters.create(current);
  }
}


const populateSchoolsTable = async (school) => {

  var data = [];
  for(let i = 0; i< school.length; i++)
  {
    let point = school[i][10];
    let long = point.substr(7,17);
    let lat = point.substr(lastIndexOf(' ')+1,17);
    //console.log(long, lat);
      let object = {
        "name": school[i][8],
        "latitude": lat,
        "longitude": long
      };
      data.push(object);
  }

  for (let i = 0; i < data.length; i++) {
    let current = data[i];
    let builtShelter = await Shelters.create(current);
  }
}

const seedDatabase = async () => {
  
  try {
    //await populateSchoolsTable(schools);
    await populateFalloutTable(fallout);
    console.log('database has been re-seeded');
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = seedDatabase;