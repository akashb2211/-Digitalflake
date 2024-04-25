CREATE DATABASE DigitalFlex;

USE DigitalFlex;


CREATE TABLE category(
     category_id  INT PRIMARY KEY AUTO_INCREMENT ,
     name  VARCHAR(30),
     description VARCHAR(255),
     status VARCHAR(255)
     
);

CREATE TABLE product(
     category_id  INT PRIMARY KEY AUTO_INCREMENT ,
     product_name  VARCHAR(50),
     packsize VARCHAR(50),
     mrp VARCHAR(50),
   
     status VARCHAR(255),
     image BLOB
     
);

CREATE TABLE admin(admin_id INT PRIMARY KEY AUTO_INCREMENT,
    email_id VARCHAR(50)UNIQUE NOT NULL,password VARCHAR(255));



-- Create product table
CREATE TABLE product (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    pack_size VARCHAR(50),
    category_id INT,
    mrp DECIMAL(10, 2),
    image VARCHAR(255),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (category_id) REFERENCES category(category_id)
);

-- -- Create category table
-- CREATE TABLE category (
--     category_id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description VARCHAR(255),
--     status ENUM('Active', 'Inactive') DEFAULT 'Active'
-- );

CREATE TABLE password_reset_tokens (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires BIGINT NOT NULL
);




SELECT 
    p.product_id,                              -- Selects the product id
    p.name AS product_name,            -- Selects the product name, aliases it as product_name
    p.pack_size,                       -- Selects the pack size of the product
    c.name AS category_name,           -- Selects the category name, aliases it as category_name
    p.mrp,                             -- Selects the Maximum Retail Price (MRP) of the product
    p.image,                           -- Selects the image of the product
    p.status AS product_status         -- Selects the status of the product, aliases it as product_status
FROM 
    product p                          -- Specifies the product table as 'p'
JOIN 
    category c ON p.category_id = c.category_id;  -- Joins with the category table based on the category_id
