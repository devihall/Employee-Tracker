const db = require("../db/connection");
const cTable = require("console.table");
const inquirer = require("inquirer");
// const inputCheck = require("./inputCheck");
const figlet = require("figlet");

//code for figlet module to display employee tracker drawing
// figlet("Employee Tracker", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

const beginInquirer = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "What would you like to do?",
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
          "EXIT",
        ],
      },
    ])
    .then((answers) => {
      const nextPrompt = answers.toDo;
      if (nextPrompt === "View all departments") {
        viewAllDepartments();
      }
      if (nextPrompt === "View all roles") {
        viewAllRoles();
      }
      if (nextPrompt === "View all employees") {
        viewAllEmployees();
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
    });
};

// Get all departments
const viewAllDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    console.log("\n");
    console.table(rows);
    return beginInquirer();
  });
};

// // Get all roles
// const viewAllRoles = () => {
//   const sql = `SELECT * FROM role`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log("\n");
//     console.table(rows);
//     return beginInquirer();
//   });
// };

//get all Employees   //////need to add left join manager //////
// const viewAllEmployees = () => {
//   const sql = `SELECT employee.id, 
//                       employee.first_name, 
//                       employee.last_name,
//                       role.Title AS title,
//                       role.Salary AS salary,
//                       department.Department_name AS department
                     
//                 FROM employee
//                 LEFT JOIN role ON employee.role_id = role.id
//                 LEFT JOIN department ON role.department_id = department.id
//                 LEFT JOIN employee manager_id ON employee.manager_id = employee.id`;

//   db.query(sql, (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     console.log("\n");
//     console.table(rows);
//     return beginInquirer();
//   });
// };

// add a department
// const addADepartment = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "nameOfDepartment",
//         message: "What is the name of the department?",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter valid department name");
//             return false;
//           }
//         },
//       },
//     ])
//     .then((answer) => {
//       const sql = `INSERT INTO department (Department_name)
//   VALUES (?)`;
//       console.log(answer);
//       const params = answer.nameOfDepartment;

//       db.query(sql, params, (err, result) => {
//         console.log(result);
//         if (err) {
//           throw err;
//         }
//         console.log("Department has been added!");
//         return viewAllDepartments();
//       });
//     });
// };

// //Add roles       ///////////need to add department//////////////

// const addARole = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "addARole",
//         message: "What is the name of the role?",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter a valid name.");
//             return false;
//           }
//         },
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is the salary for this role?",
//         validate: (salaryInput) => {
//           if (isNaN(salaryInput)) {
//             console.log("Please enter a salary");
//             return false;
//           } else {
//             return true;
//           }
//         },
//       },
//     ])
//     .then((answer) => {
      
//       const params = [answer.addARole, answer.salary];
//       const sql = `SELECT * FROM department`;
//       db.query(sql, (err, rows) => {
        
//         if (err) {
//           throw err;
//         }
//         const departments = rows.map(({ Department_name, id }) => ({
//           name: Department_name,
//           value: id,
//         }));
//         inquirer.prompt([
//           {
//             type: "list",
//             name: "department",
//             message: "What department does this role belong to?",
//             choices: departments
//           },
//         ])
//         .then(departmentAnswer => {
//         const department = departmentAnswer.department;
//         params.push(department);
//         const sql = `INSERT INTO role (title, salary, department_id)
//           VALUES (?, ?, ?)`;
//         db.query(sql, params, (err) => {
//           if (err) {
//             throw err;
//           }
//           console.log("Role added!");
//           return viewAllRoles();
//         });
//       });
//       });
//     });
// };


// const addAEmployee = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "firstName",
//         message: "What is the employee's first name?",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter a first name");
//             return false;
//           }
//         },
//       },
//       {
//         type: "input",
//         name: "lastName",
//         message: "What is the employee's last name?",
//         validate: (nameInput) => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log("Please enter a last name");
//             return false;
//           }
//         },
//       },
//     ])
//     .then((answer) => {
//       const params = [answer.firstName, answer.lastName];
//       const sql = `SELECT * FROM role`;
//       db.query(sql, (err, rows) => {
//         if (err) {
//           throw err;
//         }
//         const roles = rows.map(({ Title, Department_id }) => ({ name: Title, value: Department_id }));
//         inquirer
//           .prompt([
//             {
//               type: "list",
//               name: "role",
//               message: "What is the role of this employee?",
//               choices: roles,
//             },
//           ])
//           .then((roleAnswer) => {
//             const role = roleAnswer.role;
//             params.push(role);
//             const sql = `SELECT * FROM employee`;
//             db.query(sql, (err, rows) => {
//               if (err) {
//                 throw err;
//               }
//               const managers = rows.map(({ first_name, last_name, id }) => ({
//                 name: `${first_name} ${last_name}`,
//                 value: id,
//               }));
//               managers.push({ name: "No manager", value: null });
//               inquirer
//                 .prompt([
//                   {
//                     type: "list",
//                     name: "manager",
//                     message: "Who is this employee's manager?",
//                     choices: managers,
//                   },
//                 ])
//                 .then((managerAnswer) => {
//                   const manager = managerAnswer.manager;
//                   params.push(manager);
//                   const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//               VALUES (?, ?, ?, ?)`;
//                   db.query(sql, params, (err) => {
//                     if (err) {
//                       throw err;
//                     }
//                     console.log("Employee added!");
//                     return viewAllEmployees();
//                   });
//                 });
//             });
//           });
//       });
//     });
// };



// // Delete a department
// app.delete("/api/department/:id", (req, res) => {
//   const sql = `DELETE FROM department WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: "Department not found",
//       });
//     } else {
//       res.json({
//         message: "deleted",
//         changes: result.affectedRows,
//         id: req.params.id,
//       });
//     }
//   });
// });

// const updateEmployeeRole = () => {
//   const sql = `SELECT first_name, last_name, id FROM employee`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     const employees = rows.map(({ first_name, last_name, id }) => ({
//       name: `${first_name} ${last_name}`,
//       value: id,
//     }));
//     inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "employee",
//           message: "Which employee's role would you like to update?",
//           choices: employees,
//         },
//       ])
//       .then((employeeAnswer) => {
//         const employee = employeeAnswer.employee;
//         const params = [employee];
//         const sql = `SELECT title, id FROM role`;
//         db.query(sql, (err, rows) => {
//           if (err) {
//             throw err;
//           }
//           const roles = rows.map(({ title, id }) => ({
//             name: title,
//             value: id,
//           }));
//           inquirer
//             .prompt([
//               {
//                 type: "list",
//                 name: "role",
//                 message: "What is the new role of this employee?",
//                 choices: roles,
//               },
//             ])
//             .then((rolesAnswer) => {
//               const role = rolesAnswer.role;
//               params.unshift(role);
//               const sql = `UPDATE employee
//                         SET role_id = ?
//                         WHERE id = ?`;
//               db.query(sql, params, (err) => {
//                 if (err) {
//                   throw err;
//                 }
//                 console.log("Employee updated!");
//                 return viewAllEmployees();
//               });
//             });
//         });
//       });
//   });
// };



module.exports = beginInquirer;
