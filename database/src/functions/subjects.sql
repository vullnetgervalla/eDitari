DROP FUNCTION IF EXISTS getSubjects(integer);
CREATE OR REPLACE FUNCTION getSubjects(school_id integer)
RETURNS SETOF subject LANGUAGE sql
AS
$$
    SELECT * FROM subject
    WHERE schoolid = school_id;
$$;

DROP FUNCTION IF EXISTS createSubject(VARCHAR, INTEGER);
CREATE OR REPLACE FUNCTION createSubject(i_name VARCHAR, i_schoolid INTEGER)
RETURNS SETOF subject LANGUAGE sql
AS
$$
    INSERT INTO subject (name, schoolid)
    VALUES (i_name, i_schoolid)
    RETURNING *;
$$;

DROP FUNCTION IF EXISTS createTeacherSubject(integer, integer, integer, boolean, integer);
CREATE OR REPLACE FUNCTION createTeacherSubject(i_teacherid INTEGER, i_subjectid INTEGER, i_yearid INTEGER, i_isActive BOOLEAN)
RETURNS SETOF teachersubject LANGUAGE sql
AS
$$
    INSERT INTO teachersubject (teacherid, subjectid, yearid, isactive)
    VALUES (i_teacherid, i_subjectid, i_yearid, i_isActive)
    RETURNING *;
$$;

DROP FUNCTION IF EXISTS getTeacherSubjects(integer);
CREATE OR REPLACE FUNCTION getTeacherSubjects(i_schoolid INTEGER)
RETURNS TABLE (
    id INTEGER,
    teacherid INTEGER,
    subjectid INTEGER,
    yearid INTEGER,
    isactive BOOLEAN,
    teacher JSONB,
    subject JSONB,
    year JSONB
)
LANGUAGE sql
AS $$
    SELECT
        teachersubject.*,
        jsonb_build_object(
            'id', "Teacher".id,
            'firstname', "Teacher".firstname,
            'lastname', "Teacher".lastname,
            'fullname', "Teacher".firstname || ' ' || "Teacher".lastname
        ) AS teacher,
        jsonb_build_object(
            'id', subject.id,
            'name', subject.name
        ) AS subject,
        jsonb_build_object(
            'id', year.id,
            'year', year.year
        ) AS year
    FROM
        teachersubject
    JOIN
        "User" AS "Teacher" ON teachersubject.teacherid = "Teacher".id
    JOIN
        subject ON teachersubject.subjectid = subject.id
    JOIN
        year ON teachersubject.yearid = year.id
    WHERE "Teacher".schoolid = i_schoolid;
$$;

DROP FUNCTION IF EXISTS getClientTeacherSubjects(integer);
CREATE OR REPLACE FUNCTION getClientTeacherSubject(i_schoolid INTEGER)
RETURNS TABLE (
    id INTEGER,
    fullname VARCHAR,
    subject VARCHAR,
    fullname_subject VARCHAR
)
LANGUAGE sql
AS $$
    SELECT
        teachersubject.id,
        "User".firstname || ' ' || "User".lastname AS fullname,
        subject.name AS subject,
        "User".firstname || ' ' || "User".lastname || ' - ' || subject.name AS fullname_subject
    FROM teachersubject
    JOIN "User" ON "User".id = teachersubject.teacherid
    JOIN subject ON subject.id = teachersubject.subjectid
    WHERE "User".schoolid = i_schoolid;
$$;


DROP FUNCTION IF EXISTS getTeacherSubjectsSchedule(integer, integer);
CREATE OR REPLACE FUNCTION getTeacherSubjectsSchedule(i_teacherid INTEGER, i_schoolid INTEGER)
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
    select MIN(schedule.id) AS id, subject.name, class.id as classid, class.classname, class.classlevel, year.year from schedule 
    join teachersubject on schedule.teachersubjectid = teachersubject.id 
    join subject on teachersubject.subjectid = subject.id join class on schedule.classid = class.id 
    join year on class.yearid = year.id
    where teachersubject.teacherid = i_teacherid
    and class.schoolid = i_schoolid
    group by subject.name, class.id, class.classname, class.classlevel, year.year;
$$;

DROP FUNCTION IF EXISTS studentScheduleAccess(integer, integer);
CREATE OR REPLACE FUNCTION studentScheduleAccess(i_scheduleid INTEGER, i_studentid INTEGER)
RETURNS TABLE (
    id INTEGER,
    teachersubjectid INTEGER,
    classid INTEGER,
    period INTEGER,
    day weekday,
    teacherid INTEGER,
    classname VARCHAR(255),
    classroom INTEGER,
    classlevel INTEGER,
    yearid INTEGER,
    schoolid INTEGER,
    birthday DATE,
    gender gender,
    parentid INTEGER,
    personalnumber VARCHAR(20)
)
LANGUAGE sql
AS $$
    SELECT
        schedule.id,
        schedule.teachersubjectid,
        schedule.classid,
        schedule.period,
        schedule.day,
        class.teacherid,
        class.classname,
        class.classroom,
        class.classlevel,
        class.yearid,
        class.schoolid,
        student.birthday,
        student.gender,
        student.parentid,
        student.personalnumber
    FROM schedule
    JOIN class ON schedule.classid = class.id
    JOIN student ON class.id = student.classid
    WHERE schedule.id = i_scheduleid
    AND student.id = i_studentid;
$$;

DROP FUNCTION IF EXISTS teacherScheduleAccess(integer, integer);
CREATE OR REPLACE FUNCTION teacherScheduleAccess(i_scheduleid INTEGER, i_teacherid INTEGER)
RETURNS TABLE (
    schedule_id INTEGER,
    teachersubjectid INTEGER,
    classid INTEGER,
    period INTEGER,
    day weekday,
    teachersubject_id INTEGER,
    teacherid INTEGER,
    subjectid INTEGER,
    yearid INTEGER,
    isactive BOOLEAN
)
LANGUAGE sql
AS $$
    SELECT
        schedule.id AS schedule_id,
        schedule.teachersubjectid,
        schedule.classid,
        schedule.period,
        schedule.day,
        teachersubject.id AS teachersubject_id,
        teachersubject.teacherid,
        teachersubject.subjectid,
        teachersubject.yearid,
        teachersubject.isactive
    FROM schedule
    JOIN teachersubject ON schedule.teachersubjectid = teachersubject.id
    WHERE schedule.id = i_scheduleid
    AND teachersubject.teacherid = i_teacherid;
$$;

DROP FUNCTION IF EXISTS getTeacherSubjectInfo(integer);
CREATE OR REPLACE FUNCTION getTeacherSubjectInfo(i_scheduleid INTEGER)
RETURNS TABLE (
    id INTEGER,
    period INTEGER,
    day weekday,
    classid INTEGER,
    teachersubjectid INTEGER,
    class JSONB,
    subject JSONB,
    students JSONB
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
    (
        SELECT jsonb_agg(
            jsonb_build_object(
                'id', "U_Student".id,
                'username', "U_Student".username,
                'email', "U_Student".email,
                'firstname', "U_Student".firstname,
                'lastname', "U_Student".lastname,
                'roleid', "U_Student".roleid,
                'schoolid', "U_Student".schoolid,
                'birthday', student.birthday,
                'gender', student.gender,
                'personalnumber', student.personalnumber,
                'parent', CASE
                    WHEN "Parent".id IS NOT NULL THEN jsonb_build_object(
                        'id', "Parent".id,
                        'firstname', "Parent".firstname,
                        'lastname', "Parent".lastname,
                        'fullname', "Parent".firstname || ' ' || "Parent".lastname
                    )
                    ELSE NULL
                END
            )
        )
        FROM "User" AS "U_Student"
        JOIN student ON "U_Student".id = student.id
        LEFT JOIN "User" AS "Parent" ON student.parentid = "Parent".id
        WHERE class.id = student.classid
    ) AS students
FROM schedule
JOIN class ON schedule.classid = class.id
WHERE schedule.id = i_scheduleid;
$$;