const Sequelize = require("sequelize");
const databaseName = "d5j4ki5vrt09jh";

console.log("Opening database connection");

const db = new Sequelize(
  databaseName,
  "tukckcoafyflzo",
  "c1a37cb14c8d21bddf4dc74fa51a351fcca8a7da9c80f29bfa81034fb5ac153c",
  {
    host: "ec2-54-221-198-156.compute-1.amazonaws.com",
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
