const Sequalize = require('sequelize');
const db = require('../db');

const students = db.define("students", {
    name:{
        type: Sequalize.STRING,
        allowNull: false
    },
    img:{
        type: Sequalize.STRING,
        allowNull: true
    },
    gpa:{
        type: Sequalize.DECIMAL,
        allowNull: true
    },
    campusId:{
        type: Sequalize.INTEGER,
        allowNull: true
    }
});

module.exports = students;