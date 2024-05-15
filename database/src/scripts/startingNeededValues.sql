insert into role (name) values('ADMIN'), ('TEACHER'), ('STUDENT'), ('PARENT');

INSERT INTO capabilities (name, category_name)
VALUES
('list-admin', 'admin'),
('create-admin', 'admin'),
('list-teacher', 'teacher'),
('create-teacher', 'teacher'),
('list-student', 'student'),
('create-student', 'student'),
('notifications', 'notification'),
('create-notification', 'notification'),
('list-material', 'material'),
('add-material', 'material'),
('list-role', 'roles'),
('create-role', 'roles');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'ADMIN'
AND capabilities.name IN ('list-admin', 'create-admin', 'list-teacher', 'create-teacher', 'list-student', 'create-student', 'notifications', 'create-notification', 'list-material', 'add-material', 'list-role', 'create-role');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'TEACHER'
AND capabilities.name IN ('list-student', 'create-student', 'notifications', 'create-notification', 'list-material', 'add-material');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'STUDENT'
AND capabilities.name IN ('notifications', 'create-notification', 'list-material', 'add-material');

INSERT INTO school (id, name, address, schooldomain) VALUES
(1, 'School 1', 'Address 1', 'school1.com'),
(2, 'School 2', 'Address 2', 'school2.com'),
(3, 'School 3', 'Address 3', 'school3.com');

INSERT INTO "User" (id, username, email, password, firstname, lastname, roleid, schoolid) VALUES
(1, 'admin', 'admin@example.com' , '$2a$10$LI/rTpkcz8X8IhqlBYZo2.qXNK1c/7F8DwEV2H8bPqP7lxJUfeeZq', 'Admin', 'Admin', 1, 1),
(2, 'teacher', 'teacher@example.com', '$2a$10$xh/azIq4XnVwh6YevEJb0OCDuj9.DpyUTY67l0hxGBY7oe7qMku0y', 'Teacher', 'Teacher', 2, 1),
(3, 'student', 'student@example.com', '$2a$10$ulItq0ktCHmx3TLtP3gFkezcLNqF5dBEAi9nRsbesE8ggqtbiTC1a', 'Student', 'Student', 3, 1),
(4, 'parent', 'parent@example.com', '$2a$10$ZiZtqW1tReR.T6n2PRwxZuOGD2ifOtWSCak6ytW0g6nL7YHtojgZO', 'Parent', 'Parent', 4, 1);