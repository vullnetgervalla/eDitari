DROP FUNCTION IF EXISTS getAllSchoolUsers(integer);
CREATE OR REPLACE FUNCTION getAllSchoolUsers(input_school_id integer)
RETURNS SETOF "User" LANGUAGE sql
AS
$$
    SELECT * FROM "User"
    WHERE schoolid = input_school_id;
$$;

DROP FUNCTION IF EXISTS getUserName(text, text);
CREATE OR REPLACE FUNCTION getUserName(first_name text, last_name text)
RETURNS TABLE(firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT firstname, lastname FROM "User"
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
    SELECT "User".id, firstname, lastname FROM "User"
    INNER JOIN role ON "User".roleid = role.id
    WHERE "User".schoolid = input_school_id AND role.name = 'ADMIN';
$$;

DROP FUNCTION IF EXISTS getAllParentUsers(integer);
CREATE OR REPLACE FUNCTION getAllParentUsers(input_school_id integer)
RETURNS TABLE(id integer, firstname text, lastname text) LANGUAGE sql
AS
$$
    SELECT "User".id, firstname, lastname FROM "User"
    INNER JOIN role ON "User".roleid = role.id
    WHERE "User".schoolid = input_school_id AND role.name = 'PARENT';
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

DROP FUNCTION IF EXISTS insertRoleAndCapabilities(text, text[]);
CREATE OR REPLACE FUNCTION insertRoleAndCapabilities(role_name text, capabilities_array text[])
RETURNS void LANGUAGE plpgsql AS
$$
DECLARE
    role_id INT;
    capability_id INT;
    capability_name text;
BEGIN
    INSERT INTO role (name) VALUES (role_name) RETURNING id INTO role_id;

    FOREACH capability_name IN ARRAY capabilities_array
    LOOP
        SELECT id INTO capability_id FROM capabilities WHERE name = capability_name;
        INSERT INTO role_capabilities (role_id, capability_id) VALUES (role_id, capability_id);
    END LOOP;
END;
$$;

DROP FUNCTION IF EXISTS getTotalNumberOfUsers(int, text);
CREATE OR REPLACE FUNCTION getTotalNumberOfUsers(input_school_id INT, role_name text)
RETURNS integer LANGUAGE sql
AS
$$
    SELECT COUNT(*) FROM "User"
    INNER JOIN role ON "User".roleid = role.id
    WHERE "User".schoolid = input_school_id AND role.name = role_name;
$$;

DROP FUNCTION IF EXISTS getTotalClasses;
CREATE OR REPLACE FUNCTION getTotalClasses(input_school_id INT)
RETURNS integer LANGUAGE sql
AS
$$
    SELECT COUNT(*) FROM class
    WHERE class.schoolid = input_school_id;
$$;
