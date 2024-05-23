DROP FUNCTION IF EXISTS getAllSchoolUsers(integer);

CREATE
OR REPLACE FUNCTION getAllSchoolUsers(input_school_id integer) RETURNS SETOF "User" LANGUAGE sql AS $$
SELECT
    *
FROM
    "User"
WHERE
    schoolid = input_school_id;

$$;

DROP FUNCTION IF EXISTS getUserName(text, text);

CREATE
OR REPLACE FUNCTION getUserName(first_name text, last_name text) RETURNS TABLE(firstname text, lastname text) LANGUAGE sql AS $$
SELECT
    firstname,
    lastname
FROM
    "User"
WHERE
    firstname ILIKE first_name
    AND lastname ILIKE last_name;

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
DROP FUNCTION IF EXISTS getAllUsersByRole(integer, text);

CREATE
OR REPLACE FUNCTION getAllUsersByRole(input_school_id integer, input_role_name text) RETURNS TABLE(
    id integer,
    firstname text,
    lastname text,
    email text
) LANGUAGE sql AS $$
SELECT
    "User".id,
    firstname,
    lastname,
    email
FROM
    "User"
    INNER JOIN role ON "User".roleid = role.id
WHERE
    "User".schoolid = input_school_id
    AND role.name = input_role_name;

$$;

DROP FUNCTION IF EXISTS getAllParentUsers(integer);

CREATE
OR REPLACE FUNCTION getAllParentUsers(input_school_id integer) RETURNS TABLE(id integer, firstname text, lastname text) LANGUAGE sql AS $$
SELECT
    "User".id,
    firstname,
    lastname
FROM
    "User"
    INNER JOIN role ON "User".roleid = role.id
WHERE
    "User".schoolid = input_school_id
    AND role.name = 'PARENT';

$$;

DROP FUNCTION IF EXISTS getUsersCapabilities(text);

CREATE
OR REPLACE FUNCTION getUsersCapabilities(name_of_role text) RETURNS TABLE(capability_name text, category_name text) LANGUAGE sql AS $$
SELECT
    capabilities.name,
    capabilities.category_name
FROM
    role
    INNER JOIN role_capabilities ON role.id = role_capabilities.role_id
    INNER JOIN capabilities ON capabilities.id = role_capabilities.capability_id
WHERE
    role.name = name_of_role;

$$;

DROP FUNCTION IF EXISTS insertRoleAndCapabilities(text, text []);

CREATE
OR REPLACE FUNCTION insertRoleAndCapabilities(role_name text, capabilities_array text []) RETURNS void LANGUAGE plpgsql AS $$ DECLARE role_id INT;

capability_id INT;

capability_name text;

BEGIN
INSERT INTO
    role (name)
VALUES
    (role_name) RETURNING id INTO role_id;

FOREACH capability_name IN ARRAY capabilities_array LOOP
SELECT
    id INTO capability_id
FROM
    capabilities
WHERE
    name = capability_name;

INSERT INTO
    role_capabilities (role_id, capability_id)
VALUES
    (role_id, capability_id);

END LOOP;

END;

$$;

DROP FUNCTION IF EXISTS getUser(int);

CREATE
OR REPLACE FUNCTION getUser(user_id int) RETURNS TABLE(
    id integer,
    username TEXT,
    firstname TEXT,
    lastname TEXT,
    role TEXT,
    email TEXT,
    password TEXT,
    phonenumber character varying(20),
    educationlevel character varying(50),
    experienceyears integer,
    teachingspecialization character varying(100),
    personalnumber character varying(20),
    gender public.gender,
    birthday date,
    classname character varying(20),
    parentid integer,
    address TEXT
) LANGUAGE SQL AS $$
SELECT
    "User".id,
    username,
    firstname,
    lastname,
    role.name,
    email,
    CASE
        WHEN role.name IN('TEACHER', 'STUDENT', 'PARENT') THEN '********'
        ELSE null
    END AS password,
    CASE
        WHEN role.name = 'TEACHER' THEN teacher.phonenumber
        ELSE parent.phonenumber
    END,
    CASE
        WHEN role.name = 'TEACHER' THEN teacher.educationlevel
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'TEACHER' THEN teacher.experienceyears
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'TEACHER' THEN teacher.teachingspecialization
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN student.personalnumber
        WHEN role.name = 'TEACHER' THEN teacher.personalnumber
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN student.gender
        WHEN role.name = 'TEACHER' THEN teacher.gender
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN student.birthday
        WHEN role.name = 'TEACHER' THEN teacher.birthday
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN class.classname
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN student.parentid
        ELSE NULL
    END,
    CASE
        WHEN role.name = 'STUDENT' THEN parent.address
        WHEN role.name = 'PARENT' THEN parent_role.address
        ELSE NULL
    END
FROM
    "User"
    JOIN role ON "User".roleid = role.id
    LEFT JOIN student ON "User".id = student.id
    AND role.name = 'STUDENT'
    LEFT JOIN teacher ON "User".id = teacher.id
    AND role.name = 'TEACHER'
    LEFT JOIN parent ON student.parentid = parent.id
    AND role.name = 'STUDENT'
    LEFT JOIN parent AS parent_role ON "User".id = parent_role.id
    AND role.name = 'PARENT'
    LEFT JOIN class ON student.classid = class.id
    AND role.name = 'STUDENT'
WHERE
    "User".id = user_id;

$$;

DROP FUNCTION IF EXISTS getRoles();

CREATE
OR REPLACE FUNCTION getRoles() RETURNS SETOF role LANGUAGE sql AS $$
SELECT
    *
FROM
    role;

$$;

DROP FUNCTION IF EXISTS getSchoolStudents(integer);

CREATE
OR REPLACE FUNCTION getSchoolStudents(input_schoolid integer) RETURNS TABLE (
    id integer,
    username varchar,
    email varchar,
    firstname varchar,
    lastname varchar,
    roleid integer,
    schoolid integer,
    birthday date,
    gender gender,
    personalnumber varchar,
    parent jsonb,
    class jsonb
) LANGUAGE sql AS $$
SELECT
    "U_Student".id,
    "U_Student".username,
    "U_Student".email,
    "U_Student".firstname,
    "U_Student".lastname,
    "U_Student".roleid,
    "U_Student".schoolid,
    student.birthday,
    student.gender,
    student.personalnumber,
    CASE
        WHEN "Parent".id IS NOT NULL THEN jsonb_build_object(
            'id',
            "Parent".id,
            'firstname',
            "Parent".firstname,
            'lastname',
            "Parent".lastname,
            'fullname',
            "Parent".firstname || ' ' || "Parent".lastname
        )
        ELSE NULL
    END AS parent,
    jsonb_build_object(
        'id',
        class.id,
        'classname',
        class.classname
    ) AS class
FROM
    "User" AS "U_Student"
    JOIN student ON "U_Student".id = student.id
    LEFT JOIN "User" AS "Parent" ON student.parentid = "Parent".id
    JOIN class ON student.classid = class.id
WHERE
    "U_Student".schoolid = input_schoolid
    AND "U_Student".roleid = 3;

$$;

DROP FUNCTION IF EXISTS getSchoolTeachers(integer);

CREATE
OR REPLACE FUNCTION getSchoolTeachers(input_schoolid integer) RETURNS TABLE (
    id integer,
    username varchar,
    email varchar,
    firstname varchar,
    lastname varchar,
    roleid integer,
    schoolid integer,
    birthday date,
    gender gender,
    personalnumber varchar,
    phonenumber varchar,
    educationlevel varchar,
    experienceyears integer,
    teachingspecialization varchar
) LANGUAGE sql AS $$
SELECT
    "U_Teacher".id,
    "U_Teacher".username,
    "U_Teacher".email,
    "U_Teacher".firstname,
    "U_Teacher".lastname,
    "U_Teacher".roleid,
    "U_Teacher".schoolid,
    teacher.birthday,
    teacher.gender,
    teacher.personalnumber,
    teacher.phonenumber,
    teacher.educationlevel,
    teacher.experienceyears,
    teacher.teachingspecialization
FROM
    "User" AS "U_Teacher"
    JOIN teacher ON "U_Teacher".id = teacher.id
WHERE
    "U_Teacher".schoolid = input_schoolid
    AND "U_Teacher".roleid = 2;

$$;

DROP FUNCTION IF EXISTS deleteUser(integer);

CREATE
OR REPLACE FUNCTION deleteUser(input_id integer) RETURNS SETOF "User" LANGUAGE sql AS $$ WITH deleted_user AS (
    DELETE FROM
        "User"
    WHERE
        id = input_id RETURNING *
),
deleted_student AS (
    DELETE FROM
        student
    WHERE
        id = input_id RETURNING *
),
deleted_teacher AS (
    DELETE FROM
        teacher
    WHERE
        id = input_id RETURNING *
),
deleted_parent AS (
    DELETE FROM
        parent
    WHERE
        id = input_id RETURNING *
)
SELECT
    *
FROM
    deleted_user;

$$;

DROP FUNCTION IF EXISTS updateUser(integer);

CREATE
OR REPLACE FUNCTION updateUser(
    input_id integer,
    input_username text,
    input_email text,
    input_password text,
    input_firstname text,
    input_lastname text,
    input_roleid integer
) RETURNS SETOF "User" LANGUAGE sql AS $$
UPDATE
    "User"
SET
    username = input_username,
    email = input_email,
    password = input_password,
    firstname = input_firstname,
    lastname = input_lastname,
    roleid = input_roleid
WHERE
    id = input_id RETURNING *;

$$;

DROP FUNCTION IF EXISTS getTotalNumberOfUsers(int, boolean []);

CREATE
OR REPLACE FUNCTION getTotalNumberOfUsers(schoolID int, roleName boolean []) RETURNS TABLE(
    admins int,
    teachers int,
    students int,
    parents int
) LANGUAGE sql AS $$
SELECT
    (
        CASE
            WHEN roleName [1] THEN (
                SELECT
                    COUNT(*)
                FROM
                    "User"
                WHERE
                    schoolid = schoolID
                    AND roleid = (
                        SELECT
                            id
                        FROM
                            role
                        WHERE
                            name = 'ADMIN'
                    )
            )
            ELSE 0
        END
    ) AS admins,
    (
        CASE
            WHEN roleName [2] THEN (
                SELECT
                    COUNT(*)
                FROM
                    "User"
                WHERE
                    schoolid = schoolID
                    AND roleid = (
                        SELECT
                            id
                        FROM
                            role
                        WHERE
                            name = 'TEACHER'
                    )
            )
            ELSE 0
        END
    ) AS teachers,
    (
        CASE
            WHEN roleName [3] THEN (
                SELECT
                    COUNT(*)
                FROM
                    "User"
                WHERE
                    schoolid = schoolID
                    AND roleid = (
                        SELECT
                            id
                        FROM
                            role
                        WHERE
                            name = 'STUDENT'
                    )
            )
            ELSE 0
        END
    ) AS students,
    (
        CASE
            WHEN roleName [4] THEN (
                SELECT
                    COUNT(*)
                FROM
                    "User"
                WHERE
                    schoolid = schoolID
                    AND roleid = (
                        SELECT
                            id
                        FROM
                            role
                        WHERE
                            name = 'PARENT'
                    )
            )
            ELSE 0
        END
    ) AS parents;

$$;

-- Drop FUNCTION IF EXISTS getAverageStudentsPerClass(int);
-- CREATE OR REPLACE FUNCTION getAverageStudentsPerClass(schoolID int)
-- RETURNS float LANGUAGE sql AS
-- $$
--   SELECT 
--     (CASE 
--       WHEN COUNT(DISTINCT c.id) != 0 THEN CAST(COUNT(u.*) AS float) / COUNT(DISTINCT c.id)
--       ELSE 0
--     END) AS average_students_per_class
--   FROM "User" u
--   JOIN class c ON u.classid = c.id
--   WHERE u.schoolid = schoolID AND u.roleid = (SELECT id FROM role WHERE name = 'STUDENT');
-- $$;
DROP FUNCTION IF EXISTS insertUser(text, text, text, text, text, integer, integer);

CREATE
OR REPLACE FUNCTION insertUser(
    i_username text,
    i_email text,
    i_password text,
    i_firstname text,
    i_lastname text,
    i_roleid integer,
    i_schoolid integer
) RETURNS SETOF "User" LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
INSERT INTO
    "User" (
        username,
        email,
        password,
        firstname,
        lastname,
        roleid,
        schoolid
    )
VALUES
    (
        i_username,
        i_email,
        i_password,
        i_firstname,
        i_lastname,
        i_roleid,
        i_schoolid
    ) RETURNING *;

END;

$$;

DROP FUNCTION IF EXISTS insertStudent(integer, integer, text, integer, date, gender);

CREATE
OR REPLACE FUNCTION insertStudent(
    i_id integer,
    i_parentid integer,
    i_personalnumber text,
    i_classid integer,
    i_birthday date,
    i_gender gender
) RETURNS SETOF student LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
INSERT INTO
    student (
        id,
        parentid,
        personalnumber,
        classid,
        birthday,
        gender
    )
VALUES
    (
        i_id,
        i_parentid,
        i_personalnumber,
        i_classid,
        i_birthday,
        i_gender
    ) RETURNING *;

END;

$$;

DROP FUNCTION IF EXISTS insertTeacher(
    integer,
    text,
    text,
    integer,
    text,
    text,
    date,
    gender
);

CREATE
OR REPLACE FUNCTION insertTeacher(
    i_id integer,
    i_phonenumber text,
    i_educationlevel text,
    i_experienceyears integer,
    i_teachingspecialization text,
    i_personalnumber text,
    i_birthday date,
    i_gender gender
) RETURNS SETOF teacher LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
INSERT INTO
    teacher (
        id,
        phonenumber,
        educationlevel,
        experienceyears,
        teachingspecialization,
        personalnumber,
        birthday,
        gender
    )
VALUES
    (
        i_id,
        i_phonenumber,
        i_educationlevel,
        i_experienceyears,
        i_teachingspecialization,
        i_personalnumber,
        i_birthday,
        i_gender
    ) RETURNING *;

END;

$$;

DROP FUNCTION IF EXISTS getParent(int);

CREATE
OR REPLACE FUNCTION getParent(student_id int) RETURNS TABLE(
    id integer,
    username TEXT,
    "firstname" TEXT,
    "lastName" TEXT,
    email TEXT,
    "phonenumber" character varying(20),
    address TEXT,
    role TEXT
) LANGUAGE SQL AS $$
SELECT
    U_Parent.id AS id,
    U_Parent.username as username,
    U_Parent.firstname AS firstName,
    U_Parent.lastname AS lastName,
    U_Parent.email AS email,
    parent.phonenumber AS phonenumber,
    parent.address AS address,
    Role.name AS roleName
FROM
    "User" AS U_Student
    JOIN student ON U_Student.id = student.id
    JOIN parent ON student.parentid = parent.id
    JOIN "User" AS U_Parent ON parent.id = U_Parent.id
    JOIN Role ON U_Parent.roleid = Role.id
WHERE
    U_Student.id = student_id;

$$;

DROP FUNCTION IF EXISTS insertParent(integer, text, text);

CREATE
OR REPLACE FUNCTION insertParent(
    i_id integer,
    i_address text,
    i_phonenumber text
) RETURNS SETOF parent LANGUAGE plpgsql AS $$ BEGIN RETURN QUERY
INSERT INTO
    parent (id, address, phonenumber)
VALUES
    (i_id, i_address, i_phonenumber) RETURNING *;

END;

$$;