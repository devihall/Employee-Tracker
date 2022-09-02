const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./inputCheck");
const cTable = require("console.table");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "earthmars",
    database: "employee_tracker",
  },
  console.log("Connected to the Employee Tracker database.")
);

const beginInquirer = () =>{

  inquirer.prompt([{
    type: "list",
    name: "toDo",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add a employee",
      "Update an employee role",
      "Update an employee's manager",
      "View employees by manager",
      "View employees by department",
      "Delete a department",
      "Delete a role",
      "Delete a employee",
      "EXIT"
    ]
  }
])
.then(answers =>{
  const nextPrompt = answers.toDo;
  if (nextPrompt ==="View all departments"){
    viewAllDepartments()
  }
  if (nextPrompt ==="View all roles"){
    viewAllRoles()
  }
  if (nextPrompt ==="View all employees"){
    viewAllEmployees()
  }
  if (nextPrompt === "Add a department") {
    addADepartment();
  }
  if (nextPrompt === "Add a role") {
    addARole();
  }
  if (nextPrompt === "Add a employee") {
    addAEmployee();
  }
  if (nextPrompt === "Update an employee role") {
    updateEmployeeRole();
  }
  if (nextPrompt === "Update an employee's manager") {
    updateEmployeeManager();
  }
  if (nextPrompt === "View employees by manager") {
    viewEmployeeByManager();
  }
  if (nextPrompt === "View employees by department") {
    viewEmployeeByDepartment();
  }
  if (nextPrompt === "Delete a department") {
    deleteDepartment();
  }
  if (nextPrompt === "Delete a role") {
    deleteRole();
  }
  if (nextPrompt === "Delete a employee") {
    deleteEmployee();
  }
  if (nextPrompt === "EXIT") {
    process.exit();
  }
})
}
// beginInquirer();

// Get all departments
const viewAllDepartments = () =>{
app.get('/api/department', (req, res) => {
  const sql = `SELECT role. *, department.Department_name AS department
FROM role 
LEFT JOIN department ON role.Department_id=department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows})
     
    });
  });return beginInquirer(); 
}



// Get all roles
const viewAllRoles = () =>{
app.get('/api/role', (req, res) => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
  // beginInquirer();
});
}



// Delete a department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

//// add a department
app.post('/api/department', ({ body }, res) => {
  const errors = inputCheck(body, 'Department_name');

  console.log(body)

  if (errors) {
    console.log(errors);
    res.status(400).json({ error: res.message });
    return;
  }

  const sql = `INSERT INTO department (Department_name)
  VALUES (?)`;
  const params = [body.Department_name];

  db.query(sql, params, (err, result) => {
    console.log(result);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});



//Add roles       ///////////need to add department//////////////
app.post("/api/role", ({ body }, res) => {
  const errors = inputCheck(body, "Title","Salary", "Department_id");

  console.log(body);

  if (errors) {
    console.log(errors);
    res.status(400).json({ error: res.message });
    return;
  }

  const sql = `INSERT INTO role (Title, Salary, Department_id)
  VALUES (?,?,?)`;
  const params = [body.Title, body.Salary, body.Department_id];

  db.query(sql, params, (err, result) => {
    console.log(result);
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

//get all Employees   //////need to add left join manager //////
app.get("/api/employee", (req, res) => {
  const sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name,
                      role.Title AS title,
                      role.Salary AS salary,
                      department.Department_name AS department
                     
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee manager_id ON employee.manager_id = employee.id`;
 


  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
