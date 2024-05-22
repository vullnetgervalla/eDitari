insert into role (name) values('ADMIN'), ('TEACHER'), ('STUDENT'), ('PARENT');

INSERT INTO capabilities (name, category_name)
VALUES
('home', 'default'),
('schedule', 'default'),
('subject', 'default'),
('notification', 'default'),
('material', 'default'),
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
('create-role', 'roles'),
('list-subject', 'subject'),
('create-subject', 'subject');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'ADMIN'
AND capabilities.name IN ('home', 'list-admin', 'create-admin', 'list-teacher', 'create-teacher', 'list-student', 'create-student', 'notifications', 'create-notification', 'list-role', 'create-role', 'list-subject', 'create-subject');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'TEACHER'
AND capabilities.name IN ('home', 'schedule', 'list-student', 'create-student', 'notifications', 'create-notification', 'list-material', 'add-material', 'list-subject');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'STUDENT'
AND capabilities.name IN ('home', 'schedule', 'subject', 'notification','material' );

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'PARENT'
AND capabilities.name IN ('home', 'schedule', 'subject', 'notification', 'material' );


INSERT INTO year (year, startdate, enddate, isactive)
VALUES
('2023-2024', '2023-09-01', '2023-06-30', true);


INSERT INTO school (name, address, schooldomain)
VALUES
('Main School', '123 School St', 'main');


INSERT INTO class (teacherid, classname, classroom, classlevel, yearid, schoolid)
VALUES
(null, '6-1', 10, 6, 1, 1),
(null, '6-2', 11, 6, 1, 1),
(null, '7-1', 12, 7, 1, 1),
(null, '8-1', 13, 8, 1, 1),
(null, '9-1', 14, 9, 1, 1);


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


INSERT INTO teacher (id, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, gender, birthday)
VALUES
((SELECT id FROM "User" WHERE username = 'teacher'), '+38344753456', 'Masters Degree in Mathematics', 10, 'Mathematics', '2012353233', 'M', '1990-01-15'),
((SELECT id FROM "User" WHERE username = 'florajanushi'), '+38345764657', 'Bachelors Degree in Literature', 5, 'Literature', '2150323123', 'F', '1985-06-30'),
((SELECT id FROM "User" WHERE username = 'elbanazeqiri'), '+38349746345', 'Bachelors Degree in Science', 7, 'Physics', '2103423576', 'F', '2000-12-25');


INSERT INTO student (id, classid, birthday, gender, parentid, personalnumber)
VALUES
((SELECT id FROM "User" WHERE username = 'student'), 1, '2006-05-15', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2432532212'),
((SELECT id FROM "User" WHERE username = 'teutakrasniqi'), 1, '2007-08-25', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2312532321'),
((SELECT id FROM "User" WHERE username = 'ervinkola'), 1, '2006-03-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'arberhoxha')), '2353123212'),
((SELECT id FROM "User" WHERE username = 'astritzeneli'), 1, '2006-11-30', 'M', null, '2647438975'),
((SELECT id FROM "User" WHERE username = 'edonalban'), 1, '2007-01-20', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2123435423'),
((SELECT id FROM "User" WHERE username = 'valonashala'), 1, '2006-09-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2432546437');
