DROP TABLE IF EXISTS department, role;

CREATE TABLE department(
id INT UNIQUE AUTO_INCREMENT,
Department_name VARCHAR(30)NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role(
   id INT AUTO_INCREMENT, 
   Title VARCHAR(30),
   Department_id INT,
   Salary INT,
   PRIMARY KEY (id),
   FOREIGN KEY (Department_id)
   REFERENCES Department(id)
   ON DELETE SET NULL
);

CREATE TABLE employee(
   id INT AUTO_INCREMENT, 
   first_name VARCHAR(30),
   last_name VARCHAR(30),
   role_id INT,
   manager_id INT,
   PRIMARY KEY (id),
   FOREIGN KEY (role_id)
   REFERENCES role(id)
   ON DELETE SET NULL,
   FOREIGN KEY (manager_id) 
   REFERENCES employee(id)
);

-- SELECT * FROM employee
-- LEFT JOIN role ON employee.role_id = role.id
-- LEFT JOIN role ON manager_id = employee.id

