DROP FUNCTION IF EXISTS getAllSchoolUsers(integer);
CREATE OR REPLACE FUNCTION getAllSchoolUsers(input_school_id integer)
RETURNS SETOF public."User" LANGUAGE sql
AS
$$
    SELECT * FROM public."User"
    WHERE schoolid = input_school_id;
$$;

--Procedure for retrieving user name and lastname for email generating
DROP FUNCTION IF EXISTS getUserName(text, text);
CREATE OR REPLACE FUNCTION getUserName(first_name text, last_name text)
RETURNS TABLE(firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT firstname, lastname FROM public."User"
    WHERE firstname = first_name
    AND lastname = last_name;
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
    SELECT public."User".id, public."User".firstname, public."User".lastname 
    FROM public."User"
    INNER JOIN role ON public."User".roleid = role.id
    WHERE public."User".schoolid = input_school_id AND role.name = 'ADMIN';
$$;

DROP FUNCTION IF EXISTS getAllParentUsers(integer);
CREATE OR REPLACE FUNCTION getAllParentUsers(input_school_id integer)
RETURNS TABLE(id integer, firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT public."User".id, public."User".firstname, public."User".lastname 
    FROM public."User"
    INNER JOIN role ON public."User".roleid = role.id
    WHERE public."User".schoolid = input_school_id AND role.name = 'PARENT';
$$;


DROP FUNCTION IF EXISTS getUsersCapabilities(text);
CREATE OR REPLACE FUNCTION getUsersCapabilities(name_of_role text)
RETURNS TABLE(capability_name text, category_name text) LANGUAGE sql AS
$$
    SELECT capabilities.name, capabilities.category_name
    FROM role
    INNER JOIN role_capabilities ON role.id = role_capabilities.role_id
    INNER JOIN capabilities ON capabilities.id = role_capabilities.capability_id
    WHERE role.name = name_of_role;
$$
;