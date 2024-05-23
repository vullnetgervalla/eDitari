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