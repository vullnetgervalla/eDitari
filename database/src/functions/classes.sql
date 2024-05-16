DROP FUNCTION IF EXISTS getAllSchoolClasses(integer);
CREATE OR REPLACE FUNCTION getAllSchoolClasses(school_id integer)
RETURNS SETOF Class LANGUAGE sql
AS
$$
    SELECT * FROM Class
    WHERE schoolid = school_id;
$$;

DROP FUNCTION IF EXISTS getNumOfClasses(integer);
CREATE OR REPLACE FUNCTION getNumOfClasses(school_id integer)
RETURNS table (classes int) LANGUAGE sql
AS
$$
    SELECT COUNT(*) FROM Class
    WHERE schoolid = school_id;
$$;
