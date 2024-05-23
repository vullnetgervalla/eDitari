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
CREATE OR REPLACE FUNCTION createTeacherSubject(i_teacherid INTEGER, i_subjectid INTEGER, i_yearid INTEGER, i_isActive BOOLEAN, i_classid INTEGER)
RETURNS SETOF teachersubject LANGUAGE sql
AS
$$
    INSERT INTO teachersubject (teacherid, subjectid, yearid, isactive, classid)
    VALUES (i_teacherid, i_subjectid, i_yearid, i_isActive, i_classid)
    RETURNING *;
$$;