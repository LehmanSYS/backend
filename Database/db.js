const Sequelize = require("sequelize");
const databaseName = "db54l75ugkldpl";

console.log("Opening database connection");

const db = new Sequelize(
  databaseName,
  "kjnvvabnwzzrgx",
  "ace08f144177f64b420d1f1c0dc89ba0da59ee66a741c4ef57a291fe0fb2a546",
  {
    host: "ec2-174-129-253-144.compute-1.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: true
    },
    define: {
      timestamps: false
    },
    logging: false
  }
);

module.exports = db;
