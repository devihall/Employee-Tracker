CREATE TABLE department(
id INT AUTO_INCREMENT,
name VARCHAR(30)NOT NULL,
PRIMARY KEY (id)
);

-- CREATE TABLE role(
--    id INT AUTO_INCREMENT, 
--    Title VARCHAR(30),
--    department_id INT,
--    Salary INT,
--    PRIMARY KEY (id),
--    FOREIGN KEY (name)
--    REFERENCES department(id)

-- )
-- CREATE TABLE Orders (
--     OrderID int NOT NULL,
--     OrderNumber int NOT NULL,
--     PersonID int,
--     PRIMARY KEY (OrderID),
--     FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)
-- );