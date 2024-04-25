DROP FUNCTION IF EXISTS getAllSchoolClasses(integer);
CREATE OR REPLACE FUNCTION getAllSchoolClasses(school_id integer)
RETURNS SETOF Class LANGUAGE sql
AS
$$
    SELECT * FROM Class
    WHERE schoolid = school_id;
$$;
