DROP FUNCTION IF EXISTS updateAdminUser(INT, TEXT, TEXT, TEXT, TEXT, TEXT);
CREATE OR REPLACE FUNCTION updateAdminUser(
    input_id INT,
    input_firstName TEXT, 
    input_lastName TEXT, 
    input_email TEXT, 
    input_role TEXT,
    input_password TEXT
)
RETURNS VOID LANGUAGE sql AS $$
    WITH role_id AS (
        SELECT id FROM Role WHERE name = input_role
    )
    UPDATE "User" 
    SET 
        firstName = COALESCE(input_firstName, firstName), 
        lastName = COALESCE(input_lastName, lastName), 
        email = COALESCE(input_email, email), 
        roleid = COALESCE((SELECT id FROM role_id), roleid),
        password = COALESCE(input_password, password)
    WHERE id = input_id;
$$;

DROP FUNCTION IF EXISTS updateTeacherUser(INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, TEXT, TEXT, DATE, TEXT);
CREATE OR REPLACE FUNCTION updateTeacherUser(
    input_id INT,
    input_firstName TEXT, 
    input_lastName TEXT, 
    input_email TEXT, 
    input_role TEXT,
    input_gender TEXT,
    input_phonenumber TEXT,
    input_educationlevel TEXT,
    input_experienceyears INT,
    input_teachingspecialization TEXT,
    input_personalnumber TEXT,
    input_birthday DATE,
    input_password TEXT
)
RETURNS VOID LANGUAGE sql AS $$
    WITH role_id AS (
        SELECT id FROM Role WHERE name = input_role
    )
    UPDATE "User" 
    SET 
        firstName = COALESCE(input_firstName, firstName), 
        lastName = COALESCE(input_lastName, lastName), 
        email = COALESCE(input_email, email), 
        roleid = COALESCE((SELECT id FROM role_id), roleid),
        password = COALESCE(input_password, password)
    WHERE id = input_id;
    
    UPDATE teacher
    SET
        gender = COALESCE(input_gender::gender, gender),
        phonenumber = COALESCE(input_phonenumber, phonenumber),
        educationlevel = COALESCE(input_educationlevel, educationlevel),
        experienceyears = COALESCE(input_experienceyears, experienceyears),
        teachingspecialization = COALESCE(input_teachingspecialization, teachingspecialization),
        personalnumber = COALESCE(input_personalnumber, personalnumber),
        birthday = COALESCE(input_birthday, birthday)
    WHERE id = input_id;
$$;

DROP FUNCTION IF EXISTS updateStudentUser(INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INT, DATE, INT, TEXT);
CREATE OR REPLACE FUNCTION updateStudentUser(
    input_id INT,
    input_firstName TEXT, 
    input_lastName TEXT, 
    input_email TEXT, 
    input_role TEXT,
    input_gender TEXT,
    input_personalnumber TEXT,
	input_class INT,
    input_birthday DATE,
    input_parentid INT,
    input_password TEXT
)
RETURNS VOID LANGUAGE sql AS 
$$
    WITH role_id AS (
        SELECT id FROM Role WHERE name = input_role
    )
    UPDATE "User" 
    SET 
        firstName = COALESCE(input_firstName, firstName), 
        lastName = COALESCE(input_lastName, lastName), 
        email = COALESCE(input_email, email), 
        roleid = COALESCE((SELECT id FROM role_id), roleid),
        password = COALESCE(input_password, password)
    WHERE id = input_id;
    
    UPDATE student
    SET
        gender = COALESCE(input_gender::gender, gender),
        personalNumber = COALESCE(input_personalnumber, personalNumber),
        classid = COALESCE(input_class, classid),
        birthday = COALESCE(input_birthday, birthday),
        parentid = COALESCE(input_parentid, parentid)
    WHERE id = input_id;
$$;

DROP FUNCTION IF EXISTS updateParentUser(INT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT);
CREATE OR REPLACE FUNCTION updateParentUser(
    input_id INT,
    input_firstName TEXT, 
    input_lastName TEXT, 
    input_email TEXT, 
    input_role TEXT,
    input_address TEXT,
    input_phoneNumber TEXT,
    input_password TEXT
)
RETURNS VOID LANGUAGE sql AS $$
    WITH role_id AS (
        SELECT id FROM Role WHERE name = input_role
    )
    UPDATE "User" 
    SET 
        firstName = COALESCE(input_firstName, firstName), 
        lastName = COALESCE(input_lastName, lastName), 
        email = COALESCE(input_email, email), 
        roleid = COALESCE((SELECT id FROM role_id), roleid),
        password = COALESCE(input_password, password)
    WHERE id = input_id;
    
    UPDATE parent
    SET
        address = COALESCE(input_address, address),
        phoneNumber = COALESCE(input_phoneNumber, phoneNumber)
    WHERE id = input_id;
$$;
