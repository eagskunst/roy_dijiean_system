DROP DATABASE IF EXISTS roy_didijean;

CREATE DATABASE roy_didijean;
USE roy_didijean;

CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    last_session_timestamp TIMESTAMP,
    UNIQUE(email)
);

CREATE TABLE admins(
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    UNIQUE(username)
);

CREATE TABLE clients(
    user_id INT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL,
    address VARCHAR(20) NOT NULL,
    cellphone_number VARCHAR(15),
    UNIQUE(user_id, cedula)
);

CREATE TABLE products(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity_in_stock INT NOT NULL,
    img_url VARCHAR(255),
    buy_cost DECIMAL(10, 2),
    sell_cost DECIMAL(10, 2)
);

CREATE TABLE garments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    size VARCHAR(20),
    material VARCHAR(100),
    style VARCHAR(50),
    brand VARCHAR(50),
    type ENUM('upper', 'lower', 'full') NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE garment_color(
    id INT PRIMARY KEY AUTO_INCREMENT,
    garment_id INT NOT NULL,
    color VARCHAR(15) NOT NULl
);