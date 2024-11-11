
-- Computadoras >
--             Laptops y Accesorios >
--                                 Laptops >
--                                 Accesorios para Laptops >
--             Componentes >
--                         Tarjetas de Video >
--                         Tarjetas Madre >
--                         Procesadores >
--                         Memorias RAM >
--                         Almacenamiento >
--                         Fuentes de Poder >
--                         Gabinetes >
--                         Enfriamiento >
--                         Monitores y Proyectores >
--                         Impresoras y Scanners >
--             Periféricos y Accesorios >
--                                     > Teclados y Mouse >
--                                     > Audífonos >
-- Celulares y Tablets >
--                     Celulares >
--                     Tablets >
--                     Accesorios para Celulares y Tablets >
-- Electrónica >
--             Televisores >
--             Audio >
--             Cámaras y Videocámaras >

ALTER TABLE category AUTO_INCREMENT = 1;


-- Nivel 1
INSERT INTO Category (name, parent_id) VALUES ('Computadoras', NULL); -- id = 1
INSERT INTO Category (name, parent_id) VALUES ('Celulares y Tablets', NULL); -- id = 2
INSERT INTO Category (name, parent_id) VALUES ('Electrónica', NULL); -- id = 3

-- Nivel 2 - Subcategorías de Computadoras
INSERT INTO Category (name, parent_id) VALUES ('Laptops y Accesorios', 1); -- id = 4
INSERT INTO Category (name, parent_id) VALUES ('Componentes', 1); -- id = 5
INSERT INTO Category (name, parent_id) VALUES ('Periféricos y Accesorios', 1); -- id = 6

-- Nivel 3 - Subcategorías de Laptops y Accesorios
INSERT INTO Category (name, parent_id) VALUES ('Laptops', 4); -- id = 7
INSERT INTO Category (name, parent_id) VALUES ('Accesorios para Laptops', 4); -- id = 8

-- Nivel 3 - Subcategorías de Componentes
INSERT INTO Category (name, parent_id) VALUES ('Tarjetas de Video', 5); -- id = 9
INSERT INTO Category (name, parent_id) VALUES ('Tarjetas Madre', 5); -- id = 10
INSERT INTO Category (name, parent_id) VALUES ('Procesadores', 5); -- id = 11
INSERT INTO Category (name, parent_id) VALUES ('Memorias RAM', 5); -- id = 12
INSERT INTO Category (name, parent_id) VALUES ('Almacenamiento', 5); -- id = 13
INSERT INTO Category (name, parent_id) VALUES ('Fuentes de Poder', 5); -- id = 14
INSERT INTO Category (name, parent_id) VALUES ('Gabinetes', 5); -- id = 15
INSERT INTO Category (name, parent_id) VALUES ('Enfriamiento', 5); -- id = 16
INSERT INTO Category (name, parent_id) VALUES ('Monitores y Proyectores', 5); -- id = 17
INSERT INTO Category (name, parent_id) VALUES ('Impresoras y Scanners', 5); -- id = 18

-- Nivel 3 - Subcategorías de Periféricos y Accesorios
INSERT INTO Category (name, parent_id) VALUES ('Teclados y Mouse', 6); -- id = 19
INSERT INTO Category (name, parent_id) VALUES ('Audífonos', 6); -- id = 20

-- Nivel 2 - Subcategorías de Celulares y Tablets
INSERT INTO Category (name, parent_id) VALUES ('Celulares', 2); -- id = 21
INSERT INTO Category (name, parent_id) VALUES ('Tablets', 2); -- id = 22
INSERT INTO Category (name, parent_id) VALUES ('Accesorios para Celulares y Tablets', 2); -- id = 23

-- Nivel 2 - Subcategorías de Electrónica
INSERT INTO Category (name, parent_id) VALUES ('Televisores', 3); -- id = 24
INSERT INTO Category (name, parent_id) VALUES ('Audio', 3); -- id = 25
INSERT INTO Category (name, parent_id) VALUES ('Cámaras y Videocámaras', 3); -- id = 26

