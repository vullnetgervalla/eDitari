-- For User_id_seq
SELECT setval(pg_get_serial_sequence('"User"', 'id'), coalesce(max(id),0) + 1, false) FROM "User";

-- For assignment_id_seq
SELECT setval(pg_get_serial_sequence('assignment', 'id'), coalesce(max(id),0) + 1, false) FROM assignment;

-- For attendance_id_seq
SELECT setval(pg_get_serial_sequence('attendance', 'id'), coalesce(max(id),0) + 1, false) FROM attendance;

-- For capabilities_id_seq
SELECT setval(pg_get_serial_sequence('capabilities', 'id'), coalesce(max(id),0) + 1, false) FROM capabilities;

-- For class_id_seq
SELECT setval(pg_get_serial_sequence('class', 'id'), coalesce(max(id),0) + 1, false) FROM class;

-- For enrollment_id_seq
SELECT setval(pg_get_serial_sequence('enrollment', 'id'), coalesce(max(id),0) + 1, false) FROM enrollment;

-- For grade_id_seq
SELECT setval(pg_get_serial_sequence('grade', 'id'), coalesce(max(id),0) + 1, false) FROM grade;

-- For lecture_id_seq
SELECT setval(pg_get_serial_sequence('lecture', 'id'), coalesce(max(id),0) + 1, false) FROM lecture;

-- For material_id_seq
SELECT setval(pg_get_serial_sequence('material', 'id'), coalesce(max(id),0) + 1, false) FROM material;

-- For notification_id_seq
SELECT setval(pg_get_serial_sequence('notification', 'id'), coalesce(max(id),0) + 1, false) FROM notification;

-- For parent_id_seq
SELECT setval(pg_get_serial_sequence('parent', 'id'), coalesce(max(id),0) + 1, false) FROM parent;

-- For role_id_seq
SELECT setval(pg_get_serial_sequence('role', 'id'), coalesce(max(id),0) + 1, false) FROM role;

-- For schedule_id_seq
SELECT setval(pg_get_serial_sequence('schedule', 'id'), coalesce(max(id),0) + 1, false) FROM schedule;

-- For school_id_seq
SELECT setval(pg_get_serial_sequence('school', 'id'), coalesce(max(id),0) + 1, false) FROM school;

-- For studentwork_id_seq
SELECT setval(pg_get_serial_sequence('studentwork', 'id'), coalesce(max(id),0) + 1, false) FROM studentwork;

-- For subject_id_seq
SELECT setval(pg_get_serial_sequence('subject', 'id'), coalesce(max(id),0) + 1, false) FROM subject;

-- For teachersubject_id_seq
SELECT setval(pg_get_serial_sequence('teachersubject', 'id'), coalesce(max(id),0) + 1, false) FROM teachersubject;

-- For year_id_seq
SELECT setval(pg_get_serial_sequence('year', 'id'), coalesce(max(id),0) + 1, false) FROM year;

-- For student_id_seq
SELECT setval(pg_get_serial_sequence('student', 'id'), coalesce(max(id),0) + 1, false) FROM student;

-- For teacher_id_seq
SELECT setval(pg_get_serial_sequence('teacher', 'id'), coalesce(max(id),0) + 1, false) FROM teacher;