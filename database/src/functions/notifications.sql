DROP FUNCTION IF EXISTS getNotificationsDetails(integer);
CREATE OR REPLACE FUNCTION getNotificationsDetails(i_schoolid integer)
RETURNS SETOF notification LANGUAGE sql
AS
$$
    SELECT notification.id, userid, title, reach, description, parentid, date, createdat FROM notification
    JOIN "User" on userid = "User".id
    WHERE schoolid = i_schoolid;
$$;