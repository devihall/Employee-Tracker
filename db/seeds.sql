INSERT INTO department(id, Department_name) 
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

INSERT INTO role(id, Title, Department_id, Salary)
 VALUES  
 (1, 'Sales Lead', 1, 100000),
 (2, 'Salesperson', 1, 80000),
 (3, 'Lead Engineer', 2, 150000),
 (4, 'Software Engineer', 2, 120000),
 (5, 'Account Manager', 3, 160000),
 (6, 'Accountant', 3, 125000),
 (7, 'Legal Team Lead', 4, 250000),
 (8, 'Lawyer', 4, 190000);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
 VALUES  
 ('John', 'Doe', 1, NULL),
 ('Mike', 'Chan', 1, 1),
 ('Ashley', 'Rodriguez', 2, 1),
 ('Kevin', 'Tupik', 2, 1),
 ('Kunal', 'Singh', 3, 2),
 ('Malia', 'Brown', 3, 2),
 ('Sarah', 'Lourd', 4, 2),
 ('Tom', 'Allen', 4, 2),
 ('Sam', 'Kash', 1, 3);