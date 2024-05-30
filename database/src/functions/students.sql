DROP FUNCTION IF EXISTS getNumberOfStudentSubjects(int);
CREATE OR REPLACE FUNCTION getNumberOfStudentSubjects(student_id int)
RETURNS TABLE(subject_count int) AS $$
BEGIN
    RETURN QUERY
    SELECT CAST(COUNT(DISTINCT ts.subjectid) AS int)
    FROM student s
    JOIN class c ON s.classid = c.id
    JOIN schedule sch ON c.id = sch.classid
    JOIN teachersubject ts ON sch.teachersubjectid = ts.id
    WHERE s.id = student_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getStudentGPA(int);
CREATE OR REPLACE FUNCTION getStudentGPA(student_id int)
RETURNS TABLE(avg_grade numeric) AS $$
BEGIN
    RETURN QUERY    
    SELECT ROUND(AVG(enum_to_int(grade.grade)),2)
    FROM grade
    WHERE studentid = student_id;
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getStudentAttendance(int);
CREATE OR REPLACE FUNCTION getStudentAttendance(student_id int)
RETURNS TABLE(attendance integer) AS $$
BEGIN
    RETURN QUERY    
    SELECT CAST(COUNT(*) AS INT)
    FROM attendance
    WHERE studentid = student_id
    AND status = 'Unjustified';
END;
$$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS getFinalStudentGrades(int);
CREATE OR REPLACE FUNCTION getFinalStudentGrades(student_id int)
RETURNS TABLE(subject_name varchar, grade gradetype) AS $$
    SELECT subject.name, grade.grade 
    FROM grade 
    JOIN teachersubject ts ON grade.teachersubjectid = ts.id
    JOIN subject ON ts.subjectid = subject.id
    WHERE grade.studentid = student_id AND grade.final = TRUE; 
$$ LANGUAGE sql;

DROP FUNCTION IF EXISTS getAllStudentGrades(int);
CREATE OR REPLACE FUNCTION getAllStudentGrades(student_id int)
RETURNS TABLE(subject varchar, teacher varchar, grade gradetype, date date) AS $$
    SELECT subject.name, "User".firstname || ' ' || "User".lastname, grade.grade, grade.date
    FROM grade 
    JOIN teachersubject ts ON grade.teachersubjectid = ts.id
    JOIN subject ON ts.subjectid = subject.id
    JOIN "User" ON "User".id = ts.teacherid
    WHERE grade.studentid = student_id;
$$ LANGUAGE sql;

DROP FUNCTION IF EXISTS getStudentSubjectsSchedule(integer, integer);
CREATE OR REPLACE FUNCTION getStudentSubjectsSchedule(student_id INTEGER, i_schoolid INTEGER)
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    classid INTEGER,
    classname TEXT,
    classlevel TEXT,
    year TEXT
)
LANGUAGE sql
AS $$
    SELECT MIN(schedule.id) AS id, subject.name, class.id as classid, class.classname, class.classlevel, year.year 
FROM schedule 
JOIN teachersubject ON schedule.teachersubjectid = teachersubject.id 
JOIN subject ON teachersubject.subjectid = subject.id 
JOIN class ON schedule.classid = class.id 
JOIN year ON class.yearid = year.id
JOIN student ON student.classid = class.id
WHERE student.id = student_id
AND class.schoolid = i_schoolid
GROUP BY subject.name, class.id, class.classname, class.classlevel, year.year;
$$;

DROP FUNCTION IF EXISTS getStudentSubjectInfo(integer);
CREATE OR REPLACE FUNCTION getStudentSubjectInfo(i_scheduleid INTEGER)
RETURNS TABLE (
    id INTEGER,
    period INTEGER,
    day weekday,
    classid INTEGER,
    teachersubjectid INTEGER,
    class JSONB,
    subject JSONB,
	teacher VARCHAR
)
LANGUAGE sql
AS $$
SELECT
    schedule.id,
    schedule.period,
    schedule.day,
    schedule.classid,
    schedule.teachersubjectid,
    jsonb_build_object(
        'id', class.id,
        'classname', class.classname,
        'classlevel', class.classlevel,
        'classroom', class.classroom
    ) AS class,
    jsonb_build_object(
        'id', schedule.teachersubjectid,
        'name', (SELECT subject.name FROM subject JOIN teachersubject ON subject.id = teachersubject.subjectid WHERE teachersubject.id = schedule.teachersubjectid)
    ) AS subject,
	"User".firstname || ' ' || "User".lastname
FROM schedule
JOIN class ON schedule.classid = class.id
JOIN teachersubject ON schedule.teachersubjectid = teachersubject.id
JOIN "User" ON "User".id = teachersubject.teacherid
WHERE schedule.id = i_scheduleid;
$$;