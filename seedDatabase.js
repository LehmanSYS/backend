const Students = require("./Database/Models/Students");
const Campuses = require('./Database/Models/Campuses');

//import dummy data
const students = require('./Data/Students');
const campuses = require('./Data/campuses');

function getRandomInt() {
    return Math.floor((Math.random() * 2) +1);
}

const populateStudentsTable = async (students)=>{
    for(let i = 0; i < students.length; i++)
    {
        let current = students[i];
        let builtStudent = await Students.create(current);
        await builtStudent.setCampus(getRandomInt());
    }
}

const populateCampusesTable = async (campuses)=>{
    for(let i = 0; i < campuses.length; i++) 
    {
        let current = campuses[i];
        await Campuses.create(current);
    }
}

const seedDatabase = async ()=>{
    try{
        await populateCampusesTable(campuses);
        await populateStudentsTable(students);
        console.log("Database has been seeded");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = seedDatabase;