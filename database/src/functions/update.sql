DROP FUNCTION IF EXISTS updateAdminUser(INT, TEXT, TEXT, TEXT);

CREATE
OR REPLACE FUNCTION updateAdminUser(
  input_id INT,
  input_firstName TEXT,
  input_lastName TEXT,
  input_email TEXT
) RETURNS VOID LANGUAGE sql AS $$
UPDATE
  "User"
SET
  firstname = COALESCE(input_firstName, firstname),
  lastname = COALESCE(input_lastName, lastname),
  email = COALESCE(input_email, email)
WHERE
  id = input_id;

$$;

DROP FUNCTION IF EXISTS updateTeacherUser(
  INT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  INT,
  TEXT,
  TEXT,
  DATE,
  TEXT
);

CREATE
OR REPLACE FUNCTION updateTeacherUser(
  input_id INT,
  input_firstName TEXT,
  input_lastName TEXT,
  input_email TEXT,
  input_gender TEXT,
  input_phonenumber TEXT,
  input_educationlevel TEXT,
  input_experienceyears INT,
  input_teachingspecialization TEXT,
  input_personalnumber TEXT,
  input_birthday DATE,
  input_password TEXT
) RETURNS VOID LANGUAGE sql AS $$
UPDATE
  "User"
SET
  firstname = COALESCE(input_firstName, firstname),
  lastname = COALESCE(input_lastName, lastname),
  email = COALESCE(input_email, email),
  password = COALESCE(input_password, password)
WHERE
  id = input_id;

UPDATE
  teacher
SET
  gender = COALESCE(input_gender :: gender, gender),
  phonenumber = COALESCE(input_phonenumber, phonenumber),
  educationlevel = COALESCE(input_educationlevel, educationlevel),
  experienceyears = COALESCE(input_experienceyears, experienceyears),
  teachingspecialization = COALESCE(
    input_teachingspecialization,
    teachingspecialization
  ),
  personalnumber = COALESCE(input_personalnumber, personalnumber),
  birthday = COALESCE(input_birthday, birthday)
WHERE
  id = input_id;

$$;

DROP FUNCTION IF EXISTS updateStudentUser(
  INT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  TEXT,
  INT,
  DATE,
  INT,
  TEXT,
  TEXT
);

CREATE OR REPLACE FUNCTION updateStudentUser(
  input_id INT,
  input_firstName TEXT,
  input_lastName TEXT,
  input_email TEXT,
  input_gender TEXT,
  input_personalnumber TEXT,
  input_class TEXT,
  input_birthday DATE,
  input_parentid INT,
  input_password TEXT,
  input_address TEXT
) RETURNS VOID LANGUAGE sql AS $$ 
UPDATE "User"
SET
  firstname = COALESCE(input_firstName, firstname),
  lastname = COALESCE(input_lastName, lastname),
  email = COALESCE(input_email, email),
  password = COALESCE(input_password, password)
WHERE
  id = input_id;

UPDATE student
SET
  gender = COALESCE(input_gender :: gender, gender),
  personalNumber = COALESCE(input_personalnumber, personalNumber),
  birthday = COALESCE(input_birthday, birthday),
  parentid = COALESCE(input_parentid, parentid),
  classid = COALESCE((SELECT id FROM class WHERE classname = input_class), classid)
WHERE
  id = input_id;

UPDATE parent
SET
  address = COALESCE(input_address, address)
WHERE
  id = (SELECT parentid FROM student WHERE id = input_id);
$$;

DROP FUNCTION IF EXISTS updateParentUser(INT, TEXT, TEXT, TEXT, TEXT, TEXT);

CREATE
OR REPLACE FUNCTION updateParentUser(
  input_id INT,
  input_firstName TEXT,
  input_lastName TEXT,
  input_email TEXT,
  input_address TEXT,
  input_phoneNumber TEXT,
  input_password TEXT
) RETURNS VOID LANGUAGE sql AS $$
UPDATE
  "User"
SET
  firstname = COALESCE(input_firstName, firstname),
  lastname = COALESCE(input_lastName, lastname),
  email = COALESCE(input_email, email),
  password = COALESCE(input_password, password)
WHERE
  id = input_id;

UPDATE
  parent
SET
  address = COALESCE(input_address, address),
  phonenumber = COALESCE(input_phoneNumber, phonenumber)
WHERE
  id = input_id;
$$;