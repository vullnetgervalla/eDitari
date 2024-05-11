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
('list-role', 'admin'),
('create-role', 'admin');

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