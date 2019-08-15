const campus = require('./Campuses');
const students = require('./Students');

//Associations between tables, to link primary keys to foreign keys
students.belongsTo(campus);
campus.hasMany(students);

module.exports = {
    campus,
    students
}