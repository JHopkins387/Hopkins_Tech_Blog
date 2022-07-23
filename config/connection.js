//time to import the sequelize contructor
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

//time to create the connection to our mysql database
//use the dotenv environment variables instead of real values
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    })
}

module.exports = sequelize;

//for testing sequelize connection to database, run node config/connection.js

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });



