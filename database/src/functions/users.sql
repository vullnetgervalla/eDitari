DROP FUNCTION IF EXISTS getAllSchoolUsers(integer);
CREATE OR REPLACE FUNCTION getAllSchoolUsers(input_school_id integer)
RETURNS SETOF "User" LANGUAGE sql
AS
$$
    SELECT * FROM "User"
    WHERE schoolid = input_school_id;
$$;

DROP FUNCTION IF EXISTS getAllAdminUsers(integer);
CREATE OR REPLACE FUNCTION getAllAdminUsers(input_school_id integer)
RETURNS TABLE(id integer, firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT id, firstname, lastname FROM "User"
    WHERE schoolid = input_school_id AND type = 'ADMIN';
$$;