insert into role (name) values('ADMIN'), ('TEACHER'), ('STUDENT'), ('PARENT');

INSERT INTO capabilities (name, category_name)
VALUES
('home', 'default'),
('schedule', 'default'),
('subject', 'default'),
('notification', 'default'),
('material', 'default'),
('subject', 'default')
('role', 'default'),
('class', 'default'),
('list-admin', 'admin'),
('create-admin', 'admin'),
('list-teacher', 'teacher'),
('create-teacher', 'teacher'),
('list-student', 'student'),
('create-student', 'student'),
('list-role', 'roles'),
('create-role', 'roles'),
('list-subject', 'subject'),
('create-subject', 'subject'),
('list-class', 'class'),
('create-class', 'class'),
('list-schedule', 'schedule'),
('create-schedule', 'schedule');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'ADMIN'
AND capabilities.name IN ('home', 'list-admin', 'create-admin', 'list-teacher', 'create-teacher', 'list-student', 'create-student', 'notification', 'role', 'list-subject', 'create-subject', 'list-class', 'create-class', 'list-schedule', 'create-schedule');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'TEACHER'
AND capabilities.name IN ('home', 'subject', 'notification', 'material',  'class');

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'STUDENT'
AND capabilities.name IN ('home', 'schedule', 'subject', 'notification' );

INSERT INTO role_capabilities (role_id, capability_id)
SELECT role.id, capabilities.id
FROM role, capabilities
WHERE role.name = 'PARENT'
AND capabilities.name IN ('home', 'schedule', 'subject', 'notification' );


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
(null, '2-1', 3, 2, 1, 1),
(null, '2-2', 4, 2, 1, 1),
(null, '3-1', 5, 3, 1, 1),
(null, '3-2', 6, 3, 1, 1),
(null, '3-3', 21, 3, 1, 1),
(null, '3-4', 22, 3, 1, 1),
(null, '4-1', 7, 4, 1, 1),
(null, '4-2', 8, 4, 1, 1),
(null, '5-1', 9, 5, 1, 1),
(null, '5-2', 10, 5, 1, 1),
(null, '6-1', 11, 6, 1, 1),
(null, '6-2', 12, 6, 1, 1),
(null, '7-1', 13, 7, 1, 1),
(null, '7-2', 14, 7, 1, 1),
(null, '7-3', 19, 7, 1, 1),
(null, '7-4', 20, 7, 1, 1),
(null, '8-1', 15, 8, 1, 1),
(null, '8-2', 16, 8, 1, 1),
(null, '9-1', 17, 9, 1, 1),
(null, '9-2', 18, 9, 1, 1);





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
('valonashala', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'valon.ashala@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Valon', 'Ashala', 1),
('arditmaliqi', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'arditstrategi@teacher.main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Ardit', 'Maliqi', 1),
('atlantklaiqi', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'atlantklaiqi@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Atlant', 'Klaiqi', 1),
('albionkryeziu', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'albionkryeziu@teacher.main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Albion', 'Kryeziu', 1),
('samirbllacaku', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'samirbllacaku@teacher.main.com', (SELECT id FROM role WHERE name = 'TEACHER'), 'Samir', 'Bllacaku', 1),
('gentinklaiqi', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'gentinklaiqi@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Gentin', 'Klaiqi', 1),
('donatgosalci', '$2a$10$PP5o8/1esrQC2OAihgsL2Orvkpx4GFIRdV2WfQ7WHM/YONCbKS0ke', 'donatgosalci@student.main.com', (SELECT id FROM role WHERE name = 'STUDENT'), 'Donat', 'Gosalci', 1);


Insert into subject (name, schoolid)
Values ('Mathematics', 1),
		('Science', 1),
		('History',1),
		('English', 1),
		('Geography', 1),
		('Physics', 1),
		('Chemistry', 1),
		('Biology', 1),
		('Physical Education', 1),
		('Art', 1),
    ('Literature', 1);


INSERT INTO parent (id, address, phonenumber)
VALUES
((SELECT id FROM "User" WHERE username = 'parent'), '123 Dragodan, Prishtina, Kosova', '+38345634534'),
((SELECT id FROM "User" WHERE username = 'besimqerreti'), '14 Dardani, Prishtina, Kosova', '+38344653452'),
((SELECT id FROM "User" WHERE username = 'arberhoxha'), '72 Kodra e Trimave, Prishtina, Kosova', '+38349597032');


INSERT INTO teacher (id, phonenumber, educationlevel, experienceyears, teachingspecialization, personalnumber, gender, birthday)
VALUES
((SELECT id FROM "User" WHERE username = 'teacher'), '+38344753456', 'Masters Degree in Mathematics', 10, 'Mathematics', '2012353233', 'M', '1990-01-15'),
((SELECT id FROM "User" WHERE username = 'florajanushi'), '+38345764657', 'Bachelors Degree in Literature', 5, 'Literature', '2150323123', 'F', '1985-06-30'),
((SELECT id FROM "User" WHERE username = 'elbanazeqiri'), '+38349746345', 'Bachelors Degree in Science', 7, 'Physics', '2123456789', 'F', '2000-12-25'),
((SELECT id FROM "User" WHERE username = 'arditmaliqi'), '+38349746345', 'Bachelors Degree in Science', 7, 'Art', '2100023576', 'M', '2000-12-25'),
((SELECT id FROM "User" WHERE username = 'albionkryeziu'), '+38349746345', 'Bachelors Degree in Science', 7, 'Physical Education', '2103423576', 'M', '2000-12-25'),
((SELECT id FROM "User" WHERE username = 'samirbllacaku'), '+38349746345', 'Bachelors Degree in Science', 7, 'Biology', '2103423006', 'M', '2000-12-25');




INSERT INTO student (id, classid, birthday, gender, parentid, personalnumber)
VALUES
((SELECT id FROM "User" WHERE username = 'student'), 1, '2006-05-15', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2432532212'),
((SELECT id FROM "User" WHERE username = 'teutakrasniqi'), 1, '2007-08-25', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2312532321'),
((SELECT id FROM "User" WHERE username = 'ervinkola'), 1, '2006-03-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'arberhoxha')), '2353123212'),
((SELECT id FROM "User" WHERE username = 'astritzeneli'), 1, '2006-11-30', 'M', null, '2647438975'),
((SELECT id FROM "User" WHERE username = 'edonalban'), 1, '2007-01-20', 'F', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'parent')), '2123435423'),
((SELECT id FROM "User" WHERE username = 'valonashala'), 1, '2006-09-10', 'M', (SELECT id FROM parent WHERE id = (SELECT id FROM "User" WHERE username = 'besimqerreti')), '2432546437'),
((SELECT id FROM "User" WHERE username = 'atlantklaiqi'),1, '2003-10-18', 'M', null, '2432532202'),
((SELECT id FROM "User" WHERE username = 'gentinklaiqi'),1, '2004-05-15', 'M', null, '2432532219'),
((SELECT id FROM "User" WHERE username = 'donatgosalci'),1, '2005-05-15', 'M', null, '2432532218');


INSERT INTO teachersubject (teacherid, subjectid, yearid, isactive) 
VALUES (
  (SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Flora'), 
  (SELECT id FROM subject WHERE name = 'Literature'),
  1,
  true),
(
	(SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Elbana'), 
  (SELECT id FROM subject WHERE name = 'Physics'),
  1,
  true),
  ((SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Ardit'), 
  (SELECT id FROM subject WHERE name = 'Art'),
  1,
  true),
  ((SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Albion'), 
  (SELECT id FROM subject WHERE name = 'Physical Education'),
  1,
  true),
  ((SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Samir'), 
  (SELECT id FROM subject WHERE name = 'Biology'),
  1,
  true),
   ((SELECT teacher.id FROM teacher JOIN "User" ON teacher.id="User".id WHERE firstname = 'Main'), 
  (SELECT id FROM subject WHERE name = 'Chemistry'),
  1,
  true);


insert into grade(studentid, teachersubjectid, date, grade) values
((select student.id from student join "User" on student.id = "User".id Where firstname = 'Atlant'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Flora' and subject.name = 'Literature' ),'2024-04-12','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Gentin'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Flora' and subject.name = 'Literature' ),'2024-04-12','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Donat'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Flora' and subject.name = 'Literature' ),'2024-04-12','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Edona'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Flora' and subject.name = 'Literature' ),'2024-04-12','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Teuta'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Flora' and subject.name = 'Literature' ),'2024-04-12','2'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Atlant'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Samir' and subject.name = 'Biology' ),'2024-05-11','1'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Gentin'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Samir' and subject.name = 'Biology' ),'2024-05-11','1'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Donat'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Samir' and subject.name = 'Biology' ),'2024-05-11','2'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Edona'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Samir' and subject.name = 'Biology' ),'2024-05-11','4'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Teuta'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Samir' and subject.name = 'Biology' ),'2024-05-11','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Atlant'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-11','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Gentin'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-11','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Donat'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-8','3'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Main'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-8','5'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Teuta'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-6','3'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Ervin'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-6','2'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Astrit'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-6','2'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Edona'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-6','3'),

((select student.id from student join "User" on student.id = "User".id Where firstname = 'Valon'
),(select teachersubject.id from teachersubject
join teacher on teachersubject.teacherid = teacher.id
join "User" on teacher.id = "User".id
join subject on subject.id = teachersubject.subjectid
where firstname = 'Main' and subject.name = 'Chemistry' ),'2024-02-6','5');