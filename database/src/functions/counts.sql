DROP FUNCTION IF EXISTS GetTeacherCountByGender();
CREATE OR REPLACE FUNCTION GetTeacherCountByGender()
RETURNS TABLE(gender text, count int) LANGUAGE sql
AS
$$
    SELECT gender, COUNT(*) as count
    FROM teacher
    WHERE gender IS NOT NULL
    GROUP BY gender
	ORDER BY teacher.gender ASC;
$$;

DROP FUNCTION IF EXISTS GetAverageStudentsPerClass();
CREATE OR REPLACE FUNCTION GetAverageStudentsPerClass()
RETURNS TABLE(average_students_per_class int) LANGUAGE sql
AS
$$
    SELECT ROUND(AVG(student_count))::int as average_students_per_class
    FROM (
        SELECT classid, COUNT(*) as student_count
        FROM student
        GROUP BY classid
    ) AS class_counts;
$$;

SELECT * FROM GetAverageStudentsPerClass();