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


INSERT INTO employee ( first_name, last_name, role_id, manager)
 VALUES  
 ('John' 'Doe', 1, null),
 ('Mike' 'Chan', 1, 'John Doe'),
 ('Ashley' 'Rodriguez', 2, null),
 ('Kevin' 'Tupik', 2, 'Ashley Rodriguez'),
 ('Kunal' 'Singh', 3, null),
 ('Malia' 'Brown', 3, 'Kunal Singh'),
 ('Sarah' 'Lourd', 4, null),
 ('Tom' 'Allen', 4, 'Sarah Lourd'),
 ('Sam' 'Kash', 1, 'Ashley Rodriguez');

