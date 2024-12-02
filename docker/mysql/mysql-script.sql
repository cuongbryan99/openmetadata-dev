CREATE DATABASE openmetadata_db;
CREATE DATABASE airflow_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'openmetadata_user'@'%' IDENTIFIED BY 'openmetadata_password';
CREATE USER 'airflow_user'@'%' IDENTIFIED BY 'airflow_pass';
GRANT ALL PRIVILEGES ON openmetadata_db.* TO 'openmetadata_user'@'%' WITH GRANT OPTION;
GRANT SELECT ON mysql.general_log TO 'openmetadata_user'@'%';

GRANT PROCESS, USAGE ON *.* TO 'openmetadata_user'@'%';
GRANT ALL PRIVILEGES ON airflow_db.* TO 'airflow_user'@'%' WITH GRANT OPTION;
GRANT PROCESS, USAGE ON *.* TO 'openmetadata_user'@'%';
FLUSH PRIVILEGES;
commit;
