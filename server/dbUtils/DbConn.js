const mysql = require("mysql");
require("dotenv").config();

//Creates connection
//create pool defaults to 10 connnections. Can change by specifying connectionLimit: #
const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER1,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

console.log("Host: " + process.env.HOST);
console.log("User: " + process.env.USER1);
console.log("Password: " + process.env.PASSWORD);
console.log("Database: " + process.env.DATABASE);


console.log("Database Connection");

module.exports = db;