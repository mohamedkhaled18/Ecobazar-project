create database shop;

use shop;

create table users (
    id int not null primary key auto_increment,
    email varchar(50) not null,
    pass varchar(50) not null
);