DROP FUNCTION IF EXISTS getAllSchoolClasses(integer);
CREATE OR REPLACE FUNCTION getAllSchoolClasses(input_schoolid integer)
RETURNS TABLE (
    id integer,
    classname varchar,
    classroom integer,
    classlevel integer,
    active boolean,
    yearid integer,
    teacherid integer,
    teacher jsonb,
    year jsonb,
    schoolid integer
) LANGUAGE sql
AS
$$
    SELECT
        class.id,
        class.classname,
        class.classroom,
        class.classlevel,
        year.isactive AS active,
        class.yearid,
        class.teacherid,
        CASE
            WHEN "Teacher".id IS NOT NULL THEN
        jsonb_build_object(
            'id', "Teacher".id,
            'username', "Teacher".username,
            'email', "Teacher".email,
            'firstname', "Teacher".firstname,
            'lastname', "Teacher".lastname,
            'fullname', "Teacher".firstname || ' ' || "Teacher".lastname
        )
            ELSE NULL
        END AS teacher,
        jsonb_build_object(
            'id', year.id,
            'name', year.year,
            'startdate', year.startdate,
            'enddate', year.enddate,
            'isactive', year.isactive
        ) AS year,
        class.schoolid
    FROM class
    LEFT JOIN "User" AS "Teacher" ON class.teacherid = "Teacher".id
    JOIN year ON class.yearid = year.id
    WHERE class.schoolid = input_schoolid;
$$;

DROP FUNCTION IF EXISTS getNumOfClasses(integer);
CREATE OR REPLACE FUNCTION getNumOfClasses(school_id integer)
RETURNS table (classes int) LANGUAGE sql
AS
$$
    SELECT COUNT(*) FROM Class
    WHERE schoolid = school_id;
$$;

DROP FUNCTION IF EXISTS getNumOfStudentsPerClass();
CREATE OR REPLACE FUNCTION getNumOfStudentsPerClass()
RETURNS table (
    "classLevel" INTEGER, 
    "studentPerClassLevel" INTEGER
) LANGUAGE sql AS
$$
    SELECT class.classlevel as "classLevel", COUNT(*) as "studentPerClassLevel"
    FROM student
    JOIN class ON student.classid = class.id
    GROUP BY class.classlevel
    ORDER BY class.classlevel ASC;
$$;

DROP FUNCTION IF EXISTS getYears();
CREATE OR REPLACE FUNCTION getYears()
RETURNS SETOF year LANGUAGE sql
AS
$$
    SELECT * FROM year;
$$;

DROP FUNCTION IF EXISTS createYear();
CREATE OR REPLACE FUNCTION createYear(
    i_year VARCHAR,
    i_startdate date,
    i_enddate date,
    i_isactive boolean
)
RETURNS SETOF year
LANGUAGE SQL
AS
$$
    INSERT INTO year (year, startdate, enddate, isactive)
    VALUES (i_year, i_startdate, i_enddate, i_isactive)
    RETURNING *;
$$;

DROP FUNCTION IF EXISTS createClass();
CREATE OR REPLACE FUNCTION createClass(
    i_classname VARCHAR,
    i_classlevel INTEGER,
    i_classroom INTEGER,
    i_yearid INTEGER,
    i_teacherid INTEGER,
    i_schoolid INTEGER
)
RETURNS SETOF class
LANGUAGE SQL
AS
$$
    INSERT INTO class (classname, classlevel, classroom, yearid, teacherid, schoolid)
    VALUES (i_classname, i_classlevel, i_classroom, i_yearid, i_teacherid, i_schoolid)
    RETURNING *;
$$;