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

