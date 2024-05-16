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

insert into teacher (id, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber)
values(6, '123456789', 'primary', 5, 'mire', '123456788');
INSERT INTO public.parent (id, address, phonenumber)
VALUES (8, '123 Main St', '555-555-5555');
INSERT INTO public.student (id, classid, birthday, gender, parentid, personalnumber)
VALUES (7, 1, '2000-01-01', 'M', 8, '1234567890');
INSERT INTO public.class (id, teacherid, classname, classroom, classlevel, yearid, schoolid)
VALUES (1, 6, 'Math 101', 101, 1, 1, 1);
INSERT INTO public.year (id, year, startdate, enddate, isactive)
VALUES (1, '2022-2023', '2022-09-01', '2023-06-30', true);