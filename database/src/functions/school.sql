DROP FUNCTION IF EXISTS getSchoolName(integer);
CREATE OR REPLACE FUNCTION getSchoolName(input_id integer)
RETURNS TABLE(name text, schooldomain text) LANGUAGE sql
AS
$$
    SELECT name, schooldomain FROM school
    WHERE id = input_id;
$$;