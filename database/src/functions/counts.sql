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

DROP FUNCTION IF EXISTS GetTopStudents(integer, integer);
CREATE OR REPLACE FUNCTION GetTopStudents(i_schoolid integer, i_limit integer)
RETURNS TABLE(student_id int, firstname varchar, lastname varchar, classname varchar, average_grade numeric) LANGUAGE sql
AS
$$
    SELECT 
        student.id, 
        "User".firstname, 
        "User".lastname, 
        class.classname, 
        ROUND(AVG(enum_to_int(grade.grade)),2) as average_grade
    FROM 
        student
    JOIN 
        grade ON student.id = grade.studentid
    JOIN 
        "User" ON student.id = "User".id
    JOIN 
        class ON student.classid = class.id
	WHERE "User".schoolid = i_schoolid
    GROUP BY 
        student.id, "User".firstname, "User".lastname, class.classname
    ORDER BY 
        average_grade DESC
    LIMIT i_limit;
$$;

DROP FUNCTION IF EXISTS GetStudentsWithMostAttendances(integer, integer);
CREATE OR REPLACE FUNCTION GetStudentsWithMostAttendances(i_schoolid integer, i_limit integer)
RETURNS TABLE(student_id int, firstname varchar, lastname varchar, classname varchar, attendance_count int) LANGUAGE sql
AS
$$
    SELECT 
        student.id, 
        "User".firstname, 
        "User".lastname, 
        class.classname, 
        COUNT(attendance.id) as attendance_count
    FROM 
        student
    JOIN 
        attendance ON student.id = attendance.studentid
    JOIN 
        "User" ON student.id = "User".id
    JOIN 
        class ON student.classid = class.id
    JOIN 
        school ON "User".schoolid = school.id
    WHERE "User".schoolid = i_schoolid
    GROUP BY 
        student.id, "User".firstname, "User".lastname, class.classname
    ORDER BY 
        attendance_count DESC
    LIMIT i_limit;
$$;
