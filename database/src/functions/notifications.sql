DROP FUNCTION IF EXISTS getNotificationsDetails(integer);
CREATE OR REPLACE FUNCTION getNotificationsDetails(i_schoolid integer)
RETURNS TABLE(
    id integer,
    userid integer,
    title character varying,
    reach character varying,
    description character varying,
    createdat character varying,
    username character varying,
    role character varying
) LANGUAGE sql
AS
$$
    SELECT 
    notification.id,
    userid,
    CASE 
        WHEN position('holiday:' in title) > 0 THEN REPLACE(title, 'holiday:', '')
        ELSE title
    END AS title, 
    reach, 
    description,
    createdat, 
    "User".username, 
    role.name
FROM 
    notification
JOIN 
    "User" ON "User".id = userid
JOIN 
    role ON "User".roleid = role.id
WHERE 
    schoolid = i_schoolid;
$$;

DROP FUNCTION IF EXISTS createNotification(INTEGER, TEXT, notificationreach, TEXT, INT, DATE, DATE);
CREATE OR REPLACE FUNCTION createNotification(
    i_userid integer,
    i_title character varying,
    i_reach notificationreach,
    i_description character varying,
    i_parentid integer,
    i_date date,
    i_createdat date
)
RETURNS void
LANGUAGE sql
AS
$$
    INSERT INTO notification (userid, title, reach, description, parentid, date, createdat)
    VALUES (i_userid, i_title, i_reach, i_description,i_parentid, i_date, i_createdat);
$$;