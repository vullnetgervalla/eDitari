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


INSERT INTO year (year, startdate, enddate, isactive)
VALUES
('2023-2024', '2023-09-01', '2023-06-30', true);


INSERT INTO school (name, address, schooldomain)
VALUES
('Main School', '123 School St', 'main');


INSERT INTO class (teacherid, classname, classroom, classlevel, yearid, schoolid)
VALUES
(null, '1-1', 1, 1, 1, 1),
(null, '1-2', 2, 1, 1, 1),
(null, '1-3', 3, 1, 1, 1),
(null, '1-4', 4, 1, 1, 1),
(null, '1-5', 5, 1, 1, 1),
(null, '2-1', 6, 2, 1, 1),
(null, '2-2', 7, 2, 1, 1),
(null, '2-3', 8, 2, 1, 1),
(null, '2-4', 9, 2, 1, 1),
(null, '2-5', 10, 2, 1, 1),
(null, '3-1', 11, 3, 1, 1),
(null, '3-2', 12, 3, 1, 1),
(null, '3-3', 13, 3, 1, 1),
(null, '3-4', 14, 3, 1, 1),
(null, '3-5', 15, 3, 1, 1),
(null, '4-1', 16, 4, 1, 1),
(null, '4-2', 17, 4, 1, 1),
(null, '4-3', 18, 4, 1, 1),
(null, '4-4', 19, 4, 1, 1),
(null, '4-5', 20, 4, 1, 1),
(null, '5-1', 21, 5, 1, 1),
(null, '5-2', 22, 5, 1, 1),
(null, '5-3', 23, 5, 1, 1),
(null, '5-4', 24, 5, 1, 1),
(null, '5-5', 25, 5, 1, 1),
(null, '6-1', 26, 6, 1, 1),
(null, '6-2', 27, 6, 1, 1),
(null, '6-3', 28, 6, 1, 1),
(null, '6-4', 29, 6, 1, 1),
(null, '6-5', 30, 6, 1, 1),
(null, '7-1', 31, 7, 1, 1),
(null, '7-2', 32, 7, 1, 1),
(null, '7-3', 33, 7, 1, 1),
(null, '7-4', 34, 7, 1, 1),
(null, '7-5', 35, 7, 1, 1),
(null, '8-1', 36, 8, 1, 1),
(null, '8-2', 37, 8, 1, 1),
(null, '8-3', 38, 8, 1, 1),
(null, '8-4', 39, 8, 1, 1),
(null, '8-5', 40, 8, 1, 1),
(null, '9-1', 41, 9, 1, 1),
(null, '9-2', 42, 9, 1, 1),
(null, '9-3', 43, 9, 1, 1),
(null, '9-4', 44, 9, 1, 1),
(null, '9-5', 45, 9, 1, 1);



INSERT INTO "User" (username, password, email, roleid, firstname, lastname, schoolid)
VALUES
('admin', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'admin@main.com', (SELECT id FROM role WHERE name = 'ADMIN'), 'Main', 'Admin', 1),
('student', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'student@main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Main', 'Student', 1),
('teacher', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'teacher@main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Main', 'Teacher', 1),
('parent', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'parent@main.com', (SELECT id FROM role WHERE name = 'PARENT'), 'Main', 'Parent', 1),
('besimqerreti', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'besim.qerreti@parent.main.com', (SELECT id FROM role WHERE name = 'PARENT'), 'Besim', 'Qerreti', 1),
('arberhoxha', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'arber.hoxha@parent.main.com', (SELECT id FROM role WHERE name = 'PARENT'), 'Arber', 'Hoxha', 1),
('teutakrasniqi', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'teuta.krasniqi@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Teuta', 'Krasniqi', 1),
('ervinkola', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'ervin.kola@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Ervin', 'Kola', 1),
('florajanushi', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'flora.janushi@main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Flora', 'Janushi', 1),
('elbanazeqiri', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'elbana.zeqiri@main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Elbana', 'Zeqiri', 1),
('astritzeneli', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'astrit.zeneli@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Astrit', 'Zeneli', 1),
('edonalban', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'edona.alban@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Edona', 'Alban', 1),
('valonashala', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'valon.ashala@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Valon', 'Ashala', 1);


INSERT INTO parent (id, address, phonenumber)
VALUES
((SELECT id FROM "User" WHERE username = 'parent'), '123 Dragodan, Prishtina, Kosova', '+38345634534'),
((SELECT id FROM "User" WHERE username = 'besimqerreti'), '14 Dardani, Prishtina, Kosova', '+38344653452'),
((SELECT id FROM "User" WHERE username = 'arberhoxha'), '72 Kodra e Trimave, Prishtina, Kosova', '+38349597032');


INSERT INTO teacher (id, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber)
VALUES
((SELECT id FROM "User" WHERE username = 'teacher'), '+38344753456', 'Masters Degree in Mathematics', 10, 'Mathematics', '2012353233'),
((SELECT id FROM "User" WHERE username = 'florajanushi'), '+38345764657', 'Bachelors Degree in Literature', 5, 'Literature', '2150323123'),
((SELECT id FROM "User" WHERE username = 'elbanazeqiri'), '+38349746345', 'Bachelors Degree in Science', 7, 'Physics', '2103423576');


INSERT INTO student (id, classid, birthday, gender, parentid, personalnumber)
VALUES
((SELECT id FROM "User" WHERE username = 'student'), 1, '2006-05-15', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2432532212'),
((SELECT id FROM "User" WHERE username = 'teutakrasniqi'), 1, '2007-08-25', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2312532321'),
((SELECT id FROM "User" WHERE username = 'ervinkola'), 1, '2006-03-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'arberhoxha')), '2353123212'),
((SELECT id FROM "User" WHERE username = 'astritzeneli'), 1, '2006-11-30', 'M', null, '2647438975'),
((SELECT id FROM "User" WHERE username = 'edonalban'), 1, '2007-01-20', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2123435423'),
((SELECT id FROM "User" WHERE username = 'valonashala'), 1, '2006-09-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2432546437');
