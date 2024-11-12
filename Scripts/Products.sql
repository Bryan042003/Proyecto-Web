ALTER TABLE product AUTO_INCREMENT = 1;
Alter TABLE product_category AUTO_INCREMENT = 1;


INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Laptop Dell Inspiron', 'Laptop de alto rendimiento para trabajo y estudio.', 800.00, 'Dell', 'laptop_dell.jpg', 'Intel Core i5, 8GB RAM, 256GB SSD', NULL, 10, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Tarjeta Gráfica Nvidia GTX 1660', 'Tarjeta de video para gaming de nivel medio.', 300.00, 'Nvidia', 'gtx_1660.jpg', '6GB GDDR5, 192-bit', NULL, 15, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Mouse Logitech MX Master 3', 'Mouse inalámbrico ergonómico de alta precisión.', 100.00, 'Logitech', 'mouse_mx_master_3.jpg', 'DPI ajustable, Bluetooth y USB', NULL, 25, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Memoria RAM Kingston 16GB', 'Memoria RAM DDR4 para mejorar el rendimiento del sistema.', 80.00, 'Kingston', 'ram_kingston_16gb.jpg', 'DDR4 3200MHz', NULL, 50, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Tablet Samsung Galaxy Tab A7', 'Tablet de uso general con pantalla de 10.4 pulgadas.', 200.00, 'Samsung', 'tablet_samsung_a7.jpg', '32GB, Wi-Fi, pantalla de 10.4"', NULL, 20, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Celular iPhone 13', 'Smartphone de última generación con cámara avanzada.', 999.00, 'Apple', 'iphone_13.jpg', '128GB, A15 Bionic chip', NULL, 30, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Disco Duro Externo Seagate 1TB', 'Almacenamiento externo portátil para copias de seguridad.', 60.00, 'Seagate', 'seagate_1tb.jpg', '1TB, USB 3.0', NULL, 40, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('TV LG OLED 55"', 'Televisor OLED de 55 pulgadas con resolución 4K.', 1200.00, 'LG', 'tv_lg_oled.jpg', '4K, HDR, Smart TV', NULL, 5, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Audífonos Sony WH-1000XM4', 'Audífonos inalámbricos con cancelación de ruido.', 300.00, 'Sony', 'sony_wh_1000xm4.jpg', 'Bluetooth, cancelación de ruido', NULL, 35, 0);

INSERT INTO Product (name, description, price, brand, photo, technical_stuff, id_offer, stock, n_sales) 
VALUES ('Cámara Canon EOS Rebel T7', 'Cámara DSLR para fotógrafos principiantes.', 450.00, 'Canon', 'canon_rebel_t7.jpg', '24.1 MP, Full HD', NULL, 10, 0);


-- Asignando cada producto a una categoría específica
INSERT INTO Product_Category (id_product, id_category) VALUES (1, 7);  -- Laptop Dell Inspiron en categoría 'Laptops'
INSERT INTO Product_Category (id_product, id_category) VALUES (2, 9);  -- Tarjeta Gráfica Nvidia GTX 1660 en categoría 'Tarjetas de Video'
INSERT INTO Product_Category (id_product, id_category) VALUES (3, 19); -- Mouse Logitech MX Master 3 en categoría 'Teclados y Mouse'
INSERT INTO Product_Category (id_product, id_category) VALUES (4, 12); -- Memoria RAM Kingston 16GB en categoría 'Memorias RAM'
INSERT INTO Product_Category (id_product, id_category) VALUES (5, 22); -- Tablet Samsung Galaxy Tab A7 en categoría 'Tablets'
INSERT INTO Product_Category (id_product, id_category) VALUES (6, 21); -- Celular iPhone 13 en categoría 'Celulares'
INSERT INTO Product_Category (id_product, id_category) VALUES (7, 13); -- Disco Duro Externo Seagate 1TB en categoría 'Almacenamiento'
INSERT INTO Product_Category (id_product, id_category) VALUES (8, 24); -- TV LG OLED 55" en categoría 'Televisores'
INSERT INTO Product_Category (id_product, id_category) VALUES (9, 20); -- Audífonos Sony WH-1000XM4 en categoría 'Audífonos'
INSERT INTO Product_Category (id_product, id_category) VALUES (10, 26); -- Cámara Canon EOS Rebel T7 en categoría 'Cámaras y Videocámaras'
