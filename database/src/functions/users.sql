CREATE OR REPLACE FUNCTION getAllSchoolUsers(school_id integer)
RETURNS SETOF "User" LANGUAGE sql
AS
$$
    select * from "User"
    WHERE schoolid = school_id;
$$;
