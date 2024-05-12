CREATE OR REPLACE FUNCTION hash_password(password VARCHAR(255))
  RETURNS VARCHAR(255) AS $$
  BEGIN
    RETURN crypt(password, gen_salt('bf', 10));
  END;
  $$ LANGUAGE plpgsql;