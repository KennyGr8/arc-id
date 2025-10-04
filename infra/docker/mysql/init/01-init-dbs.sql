-- Create main and shadow databases
CREATE DATABASE IF NOT EXISTS arc_id;
CREATE DATABASE IF NOT EXISTS arc_id_shadow;

-- Create user (if not already created)
CREATE USER IF NOT EXISTS 'arcevodev'@'%' IDENTIFIED WITH mysql_native_password BY 'secret123';

-- Grant privileges
GRANT ALL PRIVILEGES ON arc_id.* TO 'arcevodev'@'%';
GRANT ALL PRIVILEGES ON arc_id_shadow.* TO 'arcevodev'@'%';
FLUSH PRIVILEGES;
