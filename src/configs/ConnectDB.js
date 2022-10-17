// get the client

import mysql from "mysql2/promise";
const { Sequelize } = require('sequelize');


// console.log("Creating connection pool");
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'apptour'
// });
//Connecte booktour
const sequelize = new Sequelize('booktour', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

let checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = checkConnect;
// export default pool;