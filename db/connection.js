const mysql = require("mysql2");

require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
        user: "root",
    //Your MySQL password
        password: "earthmars",
        database: "employee_tracker",
  },
  console.log("Connected to the company database.")
);

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // Your MySQL username,
//     user: "root",
//     // Your MySQL password
//     password: "earthmars",
//     database: "employee_tracker",
//   },
//   console.log("Connected to the Employee Tracker database.")
// );

module.exports = db;
