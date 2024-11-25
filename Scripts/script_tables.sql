CREATE DATABASE ExtremeTEC;
USE ExtremeTEC;


CREATE TABLE  Province (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL
);

CREATE TABLE  Canton (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   id_province INT NOT NULL,
   FOREIGN KEY (id_province) REFERENCES Province(id)

);


CREATE TABLE  District (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   id_canton INT NOT NULL,
  FOREIGN KEY (id_canton) REFERENCES Canton(id)
);

CREATE TABLE Address (
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_district INT NOT NULL,
   postal_code VARCHAR(100) NOT NULL,
   specific_address VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_district) REFERENCES District(id)
);

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    passw VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'logistics') NOT NULL,
    photo VARCHAR(255) ,
    phone VARCHAR(20) NOT NULL,
    id_address INT NOT NULL,
    FOREIGN KEY (id_address) REFERENCES Address(id)

);

CREATE TABLE Offer(
id INT AUTO_INCREMENT PRIMARY KEY,
discount DOUBLE NOT NULL,
start_date DATETIME NOT NULL,
end_date DATETIME 
);



CREATE TABLE Product(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  photo VARCHAR(255)  NOT NULL,
  technical_stuff VARCHAR(255)  NOT NULL,
  id_offer INT,
  FOREIGN KEY (id_offer) REFERENCES Offer(id),
  stock INT NOT NULL,
  n_sales INT DEFAULT 0
);


CREATE TABLE Review (
  id INT AUTO_INCREMENT PRIMARY KEY,
  score INT NOT NULL,
  description VARCHAR(255),
  id_user INT NOT NULL,
  FOREIGN KEY (id_user) REFERENCES User(id),
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES Product(id)

);


/*--cambiar nombre por que palabra reservada order a charge--*/
CREATE TABLE `Order`( 
   id INT AUTO_INCREMENT PRIMARY KEY,
   id_user INT NOT NULL, /*--??*/
   FOREIGN KEY (id_user) REFERENCES User(id),
   status ENUM('pending', 'in_process','sent','delivered') NOT NULL,
   total_price DOUBLE DEFAULT 0,
   `date` DATETIME NOT NULL /*--cambiar nombre por que palabra reservada date a day done--*/

);


CREATE TABLE Order_Product(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_order INT NOT NULL,
  FOREIGN KEY (id_order) REFERENCES `Order`(id),
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES Product(id),
  quantity INT NOT NULL

);

CREATE TABLE Highlight(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES Product(id),
  expired_date DATE NOT NULL

);


CREATE TABLE Notification(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES Product(id),
  description VARCHAR(255),
  `date` DATETIME /*--palabra reservada date*/
);


CREATE TABLE Category(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT, 
  FOREIGN KEY (parent_id) REFERENCES Category(id)
);



CREATE TABLE Product_Category(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_product INT NOT NULL,
  FOREIGN KEY (id_product) REFERENCES Product(id),
  id_category INT, 
  FOREIGN KEY (id_category) REFERENCES Category(id)
)