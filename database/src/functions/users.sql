DROP FUNCTION IF EXISTS getAllSchoolUsers(integer);
CREATE OR REPLACE FUNCTION getAllSchoolUsers(input_school_id integer)
RETURNS SETOF "User" LANGUAGE sql
AS
$$
    SELECT * FROM "User"
    WHERE schoolid = input_school_id;
$$;



--Procedure for retreiving user name and lastname for email generating
CREATE OR REPLACE FUNCTION getUserName(input_school_id integer)
RETURNS TABLE(firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT firstname, lastname FROM "User"
    WHERE schoolid = input_school_id;
$$;

--fix the social_security_number into database and ececute

-- CREATE TYPE userSSN AS (
--     social_security_number integer
-- );
-- CREATE OR REPLACE FUNCTION getUserSSN(userSSN integer)
-- RETURNS SETOF userSSN LANGUAGE sql
-- AS
-- $$
--     SELECT social_security_number FROM "User"
--     WHERE social_security_number = userSSN;
-- $$;

DROP FUNCTION IF EXISTS getAllAdminUsers(integer);
CREATE OR REPLACE FUNCTION getAllAdminUsers(input_school_id integer)
RETURNS TABLE(id integer, firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT id, firstname, lastname FROM "User"
    WHERE schoolid = input_school_id AND type = 'ADMIN';
$$;

