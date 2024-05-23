DROP FUNCTION IF EXISTS insertSchedule(integer, integer, integer, weekday);
CREATE OR REPLACE FUNCTION insertSchedule(i_teachersubjectid INTEGER, i_classid INTEGER, i_period INTEGER, i_day weekday)
RETURNS SETOF schedule
LANGUAGE SQL
AS $$
    INSERT INTO schedule (teachersubjectid, classid, period, day)
    VALUES (i_teachersubjectid, i_classid, i_period, i_day)
    RETURNING *;
$$;

DROP FUNCTION IF EXISTS checkDuplicateSchedule(integer, integer, integer, weekday, integer);
CREATE OR REPLACE FUNCTION checkDuplicateSchedule(i_teachersubjectid INTEGER, i_classid INTEGER, i_period INTEGER, i_day weekday, i_schoolid INTEGER)
RETURNS TABLE (
    teachersubjectid INTEGER,
    classid INTEGER,
    period INTEGER,
    day weekday
)
LANGUAGE sql
AS $$
    SELECT
        schedule.teachersubjectid,
        schedule.classid,
        schedule.period,
        schedule.day
    FROM schedule
    JOIN teachersubject ON schedule.teachersubjectid = teachersubject.id
    JOIN class ON schedule.classid = class.id
    JOIN year ON class.yearid = year.id
    WHERE class.schoolid = i_schoolid
    AND teachersubject.isactive = true
    AND year.isactive = true
    AND schedule.teachersubjectid = i_teachersubjectid
    AND schedule.classid = i_classid
    AND schedule.period = i_period
    AND schedule.day = i_day;
$$;