CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    stock_quantity VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES 
('shoes', 'clothing', 10, 5),
('mascara', 'beauty', 10.50, 5),
('socks', 'clothing', 20.50, 5),
('jacket', 'clothing', 50, 10),
('shorts', 'clothing', 20, 20),
('jeans', 'clothing', 100, 50),
('shirts', 'clothing', 15, 50),
('lip stick', 'beauty', 10.50, 5),
('video game', 'electronics', 60, 100),
('computer', 'electronics', 500, 50);




 
