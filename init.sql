CREATE DATABASE IF NOT EXISTS mydatabase;

-- Switch to the newly created database
USE mydatabase;

-- Create the Data table
CREATE TABLE Data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyN VARCHAR(255) NOT NULL,
  valueN VARCHAR(255)
);

-- Create the Users table
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  age INT,
  gender VARCHAR(255)
);