// Here, we can instantiate our connection to an already established database and use Sequelize as well;
// NOTE: Make sure that you have a database already created on your local machine*** at this point/by the time of this commit;
// This requires installing postgreSQL, our RDBMS;

// You can do this either via Postico on Mac or with the PSQL Shell;

/*
Server [localhost]: localhost
Database [postgres]: postgres
Port [5432]: 5432
Username [postgres]: postgres
Password for user postgres: <yourpasswordhere>
type in the terminal/psql shell: \l to list all databases in for the user titled "postgres" in your RDBMS;
type in the terminal/psql shell: CREATE DATABASE "w4d4-demo"; (the semicolon is important, it denotes the ending of a SQL statement to execute)
type in the terminal: \l to list all the databases (you should see the new database that you made) (this database now exists on your hard drive --- this is independent of your application)
run the following commands such that your terminal appears like so:
postgres=# \c w4d4-demo;
You are now connected to database "w4d4-demo" as user "postgres".
w4d4-demo=# 
type in the terminal: \d (this will list all of the tables in the database);
*/

const Sequelize = require('sequelize');
const databaseName = "d6tgj2ck9rr9as";

console.log('Opening database connection');

//The location of the database we are storing our information: postgres://localhost:5432/crudApp
const db = new Sequelize(databaseName, 'eqbpuilqepfgvr', '5e7f679d9280b600892f0309364cba69fa0639102f83fdaf013e267cdd9adbd7', {
    host: 'ec2-54-221-238-248.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    },
    define: {
        timestamps: false
    },
    logging: false
  });

module.exports = db;