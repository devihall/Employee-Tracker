const db = require("./db/connection");
const express = require("express");
// const mysql = require("mysql2");
const beginInquirer = require("./lib/department")
const inputCheck = require("./lib/inputCheck");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// // Connect to database
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




// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


//Start server, connect to database
db.connect(err =>{
  if (err) 
  throw err;
  console.log("connected to Employee-Tracker database.")

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);


  beginInquirer();
});
})
