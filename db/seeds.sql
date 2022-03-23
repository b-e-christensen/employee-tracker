INSERT INTO departments (name)
VALUES ("Development");

INSERT INTO roles (title, salary, department_id)
VALUES ("Junior Dev", 58000, 1),
("Senior Dev", 88000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Billy", "Bob", 1, 2),
("Average", "Joe", 2, NULL);


