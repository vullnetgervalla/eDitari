CREATE OR REPLACE FUNCTION getAllSchoolUsers(school_id integer)
RETURNS SETOF "User" LANGUAGE sql
AS
$$
    select * from "User"
    WHERE schoolid = school_id;
$$;


--Procedure for retreiving user name and lastname for email generating
CREATE OR REPLACE FUNCTION getStudentName(input_school_id integer)
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
