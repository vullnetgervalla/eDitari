DROP FUNCTION IF EXISTS hash_password(VARCHAR);
CREATE OR REPLACE FUNCTION hash_password(password VARCHAR(255))
  RETURNS VARCHAR(255) AS $$
  BEGIN
    RETURN crypt(password, gen_salt('bf', 10));
  END;
  $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS enum_to_int(gradetype);
CREATE OR REPLACE FUNCTION enum_to_int(enum_value gradetype)
RETURNS INTEGER AS $$
DECLARE
  enum_type  regtype = pg_typeof(enum_value);
  enum_array gradetype[] = enum_range(enum_value);
BEGIN
  FOR i IN 1 .. array_upper(enum_array, 1)
  LOOP
    IF enum_array[i] = enum_value THEN
      RETURN i;
    END IF;
  END LOOP;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;