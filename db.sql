create database shop;

use shop;

create table users (
    id int not null primary key auto_increment,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    userName varchar(50) not null unique,
    email varchar(50) not null unique,
    password varchar(50) not null,
    role varchar(30) not null
);
    -- constraint chk_role check [role] in ('Admin', 'Owner', 'Employee', 'customer'),

INSERT INTO users (firstName, lastName, userName, email, password, role) VALUES
('John', 'Doe', 'jdoe', 'jdoe@example.com', 'Password123!', 'admin'),
('Jane', 'Smith', 'jsmith', 'jsmith@example.com', 'SecurePass456!', 'user'),
('Michael', 'Brown', 'mbrown', 'mbrown@example.com', 'MyPass789!', 'editor'),
('Emily', 'Davis', 'edavis', 'edavis@example.com', 'StrongPwd321!', 'user'),
('David', 'Wilson', 'dwilson', 'dwilson@example.com', 'SafeKey654!', 'moderator'),
('Sophia', 'Taylor', 'staylor', 'staylor@example.com', 'LockIt987!', 'user'),
('Daniel', 'Anderson', 'danderson', 'danderson@example.com', 'PassWord111!', 'admin'),
('Olivia', 'Thomas', 'othomas', 'othomas@example.com', 'Secure222!', 'user'),
('James', 'Moore', 'jmoore', 'jmoore@example.com', 'Key333!', 'editor'),
('Isabella', 'Jackson', 'ijackson', 'ijackson@example.com', 'Safe444!', 'user');