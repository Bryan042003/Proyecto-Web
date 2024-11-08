INSERT INTO Province (name) VALUES ('San José');
INSERT INTO Province (name) VALUES ('Alajuela');
INSERT INTO Province (name) VALUES ('Cartago');
INSERT INTO Province (name) VALUES ('Heredia');
INSERT INTO Province (name) VALUES ('Guanacaste');
INSERT INTO Province (name) VALUES ('Puntarenas');
INSERT INTO Province (name) VALUES ('Limón');

-- Cantones de San José (id_province = 1)
INSERT INTO Canton (name, id_province) VALUES ('San José', 1);
INSERT INTO Canton (name, id_province) VALUES ('Escazú', 1);
INSERT INTO Canton (name, id_province) VALUES ('Desamparados', 1);
INSERT INTO Canton (name, id_province) VALUES ('Puriscal', 1);
INSERT INTO Canton (name, id_province) VALUES ('Tarrazú', 1);
INSERT INTO Canton (name, id_province) VALUES ('Aserrí', 1);
INSERT INTO Canton (name, id_province) VALUES ('Mora', 1);
INSERT INTO Canton (name, id_province) VALUES ('Goicoechea', 1);
INSERT INTO Canton (name, id_province) VALUES ('Santa Ana', 1);
INSERT INTO Canton (name, id_province) VALUES ('Alajuelita', 1);
INSERT INTO Canton (name, id_province) VALUES ('Vásquez de Coronado', 1);
INSERT INTO Canton (name, id_province) VALUES ('Acosta', 1);
INSERT INTO Canton (name, id_province) VALUES ('Tibás', 1);
INSERT INTO Canton (name, id_province) VALUES ('Moravia', 1);
INSERT INTO Canton (name, id_province) VALUES ('Montes de Oca', 1);
INSERT INTO Canton (name, id_province) VALUES ('Turrubares', 1);
INSERT INTO Canton (name, id_province) VALUES ('Dota', 1);
INSERT INTO Canton (name, id_province) VALUES ('Curridabat', 1);
INSERT INTO Canton (name, id_province) VALUES ('Pérez Zeledón', 1);
INSERT INTO Canton (name, id_province) VALUES ('León Cortés', 1);

-- Cantones de Alajuela (id_province = 2)
INSERT INTO Canton (name, id_province) VALUES ('Alajuela', 2);
INSERT INTO Canton (name, id_province) VALUES ('San Ramón', 2);
INSERT INTO Canton (name, id_province) VALUES ('Grecia', 2);
INSERT INTO Canton (name, id_province) VALUES ('San Mateo', 2);
INSERT INTO Canton (name, id_province) VALUES ('Atenas', 2);
INSERT INTO Canton (name, id_province) VALUES ('Naranjo', 2);
INSERT INTO Canton (name, id_province) VALUES ('Palmares', 2);
INSERT INTO Canton (name, id_province) VALUES ('Poás', 2);
INSERT INTO Canton (name, id_province) VALUES ('Orotina', 2);
INSERT INTO Canton (name, id_province) VALUES ('San Carlos', 2);
INSERT INTO Canton (name, id_province) VALUES ('Zarcero', 2);
INSERT INTO Canton (name, id_province) VALUES ('Sarchí', 2);
INSERT INTO Canton (name, id_province) VALUES ('Upala', 2);
INSERT INTO Canton (name, id_province) VALUES ('Los Chiles', 2);
INSERT INTO Canton (name, id_province) VALUES ('Guatuso', 2);
INSERT INTO Canton (name, id_province) VALUES ('Río Cuarto', 2);

-- Cantones de Cartago (id_province = 3)
INSERT INTO Canton (name, id_province) VALUES ('Cartago', 3);
INSERT INTO Canton (name, id_province) VALUES ('Paraíso', 3);
INSERT INTO Canton (name, id_province) VALUES ('La Unión', 3);
INSERT INTO Canton (name, id_province) VALUES ('Jiménez', 3);
INSERT INTO Canton (name, id_province) VALUES ('Turrialba', 3);
INSERT INTO Canton (name, id_province) VALUES ('Alvarado', 3);
INSERT INTO Canton (name, id_province) VALUES ('Oreamuno', 3);
INSERT INTO Canton (name, id_province) VALUES ('El Guarco', 3);

-- Cantones de Heredia (id_province = 4)
INSERT INTO Canton (name, id_province) VALUES ('Heredia', 4);
INSERT INTO Canton (name, id_province) VALUES ('Barva', 4);
INSERT INTO Canton (name, id_province) VALUES ('Santo Domingo', 4);
INSERT INTO Canton (name, id_province) VALUES ('Santa Bárbara', 4);
INSERT INTO Canton (name, id_province) VALUES ('San Rafael', 4);
INSERT INTO Canton (name, id_province) VALUES ('San Isidro', 4);
INSERT INTO Canton (name, id_province) VALUES ('Belén', 4);
INSERT INTO Canton (name, id_province) VALUES ('Flores', 4);
INSERT INTO Canton (name, id_province) VALUES ('San Pablo', 4);
INSERT INTO Canton (name, id_province) VALUES ('Sarapiquí', 4);

-- Cantones de Guanacaste (id_province = 5)
INSERT INTO Canton (name, id_province) VALUES ('Liberia', 5);
INSERT INTO Canton (name, id_province) VALUES ('Nicoya', 5);
INSERT INTO Canton (name, id_province) VALUES ('Santa Cruz', 5);
INSERT INTO Canton (name, id_province) VALUES ('Bagaces', 5);
INSERT INTO Canton (name, id_province) VALUES ('Carrillo', 5);
INSERT INTO Canton (name, id_province) VALUES ('Cañas', 5);
INSERT INTO Canton (name, id_province) VALUES ('Abangares', 5);
INSERT INTO Canton (name, id_province) VALUES ('Tilarán', 5);
INSERT INTO Canton (name, id_province) VALUES ('Nandayure', 5);
INSERT INTO Canton (name, id_province) VALUES ('La Cruz', 5);
INSERT INTO Canton (name, id_province) VALUES ('Hojancha', 5);

-- Cantones de Puntarenas (id_province = 6)
INSERT INTO Canton (name, id_province) VALUES ('Puntarenas', 6);
INSERT INTO Canton (name, id_province) VALUES ('Esparza', 6);
INSERT INTO Canton (name, id_province) VALUES ('Buenos Aires', 6);
INSERT INTO Canton (name, id_province) VALUES ('Montes de Oro', 6);
INSERT INTO Canton (name, id_province) VALUES ('Osa', 6);
INSERT INTO Canton (name, id_province) VALUES ('Quepos', 6);
INSERT INTO Canton (name, id_province) VALUES ('Golfito', 6);
INSERT INTO Canton (name, id_province) VALUES ('Coto Brus', 6);
INSERT INTO Canton (name, id_province) VALUES ('Parrita', 6);
INSERT INTO Canton (name, id_province) VALUES ('Corredores', 6);
INSERT INTO Canton (name, id_province) VALUES ('Garabito', 6);

-- Cantones de Limón (id_province = 7)
INSERT INTO Canton (name, id_province) VALUES ('Limón', 7);
INSERT INTO Canton (name, id_province) VALUES ('Pococí', 7);
INSERT INTO Canton (name, id_province) VALUES ('Siquirres', 7);
INSERT INTO Canton (name, id_province) VALUES ('Talamanca', 7);
INSERT INTO Canton (name, id_province) VALUES ('Matina', 7);
INSERT INTO Canton (name, id_province) VALUES ('Guácimo', 7);

-- Cantón San José
INSERT INTO District (name, id_canton) VALUES ('Carmen', 1);
INSERT INTO District (name, id_canton) VALUES ('Merced', 1);
INSERT INTO District (name, id_canton) VALUES ('Hospital', 1);
INSERT INTO District (name, id_canton) VALUES ('Catedral', 1);
INSERT INTO District (name, id_canton) VALUES ('Zapote', 1);
INSERT INTO District (name, id_canton) VALUES ('San Francisco de Dos Ríos', 1);
INSERT INTO District (name, id_canton) VALUES ('Uruca', 1);
INSERT INTO District (name, id_canton) VALUES ('Mata Redonda', 1);
INSERT INTO District (name, id_canton) VALUES ('Pavas', 1);
INSERT INTO District (name, id_canton) VALUES ('Hatillo', 1);
INSERT INTO District (name, id_canton) VALUES ('San Sebastián', 1);

-- Cantón Escazú
INSERT INTO District (name, id_canton) VALUES ('Escazú Centro', 2);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 2);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 2);

-- Cantón Desamparados
INSERT INTO District (name, id_canton) VALUES ('Desamparados Centro', 3);
INSERT INTO District (name, id_canton) VALUES ('San Miguel', 3);
INSERT INTO District (name, id_canton) VALUES ('San Juan de Dios', 3);
INSERT INTO District (name, id_canton) VALUES ('San Rafael Arriba', 3);
INSERT INTO District (name, id_canton) VALUES ('San Rafael Abajo', 3);
INSERT INTO District (name, id_canton) VALUES ('Gravilias', 3);
INSERT INTO District (name, id_canton) VALUES ('Damas', 3);
INSERT INTO District (name, id_canton) VALUES ('San Cristóbal', 3);
INSERT INTO District (name, id_canton) VALUES ('Rosario', 3);
INSERT INTO District (name, id_canton) VALUES ('Frailes', 3);
INSERT INTO District (name, id_canton) VALUES ('Patarrá', 3);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 3);

-- Cantón Puriscal
INSERT INTO District (name, id_canton) VALUES ('Santiago', 4);
INSERT INTO District (name, id_canton) VALUES ('Mercedes Sur', 4);
INSERT INTO District (name, id_canton) VALUES ('Barbacoas', 4);
INSERT INTO District (name, id_canton) VALUES ('Grifo Alto', 4);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 4);
INSERT INTO District (name, id_canton) VALUES ('Candelarita', 4);
INSERT INTO District (name, id_canton) VALUES ('Desamparaditos', 4);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 4);
INSERT INTO District (name, id_canton) VALUES ('Chires', 4);

-- Cantón Tarrazú
INSERT INTO District (name, id_canton) VALUES ('San Marcos', 5);
INSERT INTO District (name, id_canton) VALUES ('San Lorenzo', 5);
INSERT INTO District (name, id_canton) VALUES ('San Carlos', 5);

-- Cantón Aserrí
INSERT INTO District (name, id_canton) VALUES ('Aserrí', 6);
INSERT INTO District (name, id_canton) VALUES ('Tarbaca', 6);
INSERT INTO District (name, id_canton) VALUES ('Vuelta de Jorco', 6);
INSERT INTO District (name, id_canton) VALUES ('San Gabriel', 6);
INSERT INTO District (name, id_canton) VALUES ('Legua', 6);
INSERT INTO District (name, id_canton) VALUES ('Monterrey', 6);
INSERT INTO District (name, id_canton) VALUES ('Salitrillos', 6);

-- Cantón Mora
INSERT INTO District (name, id_canton) VALUES ('Colón', 7);
INSERT INTO District (name, id_canton) VALUES ('Guayabo', 7);
INSERT INTO District (name, id_canton) VALUES ('Tabarcia', 7);
INSERT INTO District (name, id_canton) VALUES ('Piedras Negras', 7);
INSERT INTO District (name, id_canton) VALUES ('Picagres', 7);
INSERT INTO District (name, id_canton) VALUES ('Jaris', 7);
INSERT INTO District (name, id_canton) VALUES ('Quitirrisí', 7);

-- Cantón Goicoechea
INSERT INTO District (name, id_canton) VALUES ('Guadalupe', 8);
INSERT INTO District (name, id_canton) VALUES ('San Francisco', 8);
INSERT INTO District (name, id_canton) VALUES ('Calle Blancos', 8);
INSERT INTO District (name, id_canton) VALUES ('Mata de Plátano', 8);
INSERT INTO District (name, id_canton) VALUES ('Ipís', 8);
INSERT INTO District (name, id_canton) VALUES ('Rancho Redondo', 8);
INSERT INTO District (name, id_canton) VALUES ('Purral', 8);

-- Cantón Santa Ana
INSERT INTO District (name, id_canton) VALUES ('Santa Ana Centro', 9);
INSERT INTO District (name, id_canton) VALUES ('Salitral', 9);
INSERT INTO District (name, id_canton) VALUES ('Pozos', 9);
INSERT INTO District (name, id_canton) VALUES ('Uruca', 9);
INSERT INTO District (name, id_canton) VALUES ('Piedades', 9);
INSERT INTO District (name, id_canton) VALUES ('Brasil', 9);

-- Cantón Alajuelita
INSERT INTO District (name, id_canton) VALUES ('Alajuelita Centro', 10);
INSERT INTO District (name, id_canton) VALUES ('San Josecito', 10);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 10);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 10);
INSERT INTO District (name, id_canton) VALUES ('San Felipe', 10);

-- Cantón Vázquez de Coronado
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 11);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 11);
INSERT INTO District (name, id_canton) VALUES ('Dulce Nombre de Jesús', 11);
INSERT INTO District (name, id_canton) VALUES ('Patalillo', 11);
INSERT INTO District (name, id_canton) VALUES ('Cascajal', 11);

-- Cantón Acosta
INSERT INTO District (name, id_canton) VALUES ('San Ignacio', 12);
INSERT INTO District (name, id_canton) VALUES ('Guaitil', 12);
INSERT INTO District (name, id_canton) VALUES ('Palmichal', 12);
INSERT INTO District (name, id_canton) VALUES ('Cangrejal', 12);
INSERT INTO District (name, id_canton) VALUES ('Sabanillas', 12);

-- Cantón Tibás
INSERT INTO District (name, id_canton) VALUES ('San Juan', 13);
INSERT INTO District (name, id_canton) VALUES ('Cinco Esquinas', 13);
INSERT INTO District (name, id_canton) VALUES ('Anselmo Llorente', 13);
INSERT INTO District (name, id_canton) VALUES ('León XIII', 13);

-- Cantón Moravia
INSERT INTO District (name, id_canton) VALUES ('San Vicente', 14);
INSERT INTO District (name, id_canton) VALUES ('San Jerónimo', 14);
INSERT INTO District (name, id_canton) VALUES ('La Trinidad', 14);

-- Cantón Montes de Oca
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 15);
INSERT INTO District (name, id_canton) VALUES ('Sabanilla', 15);
INSERT INTO District (name, id_canton) VALUES ('Mercedes', 15);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 15);

-- Cantón Turrubares
INSERT INTO District (name, id_canton) VALUES ('San Pablo', 16);
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 16);
INSERT INTO District (name, id_canton) VALUES ('San Juan de Mata', 16);
INSERT INTO District (name, id_canton) VALUES ('San Luis', 16);

-- Cantón Dota
INSERT INTO District (name, id_canton) VALUES ('Santa María', 17);
INSERT INTO District (name, id_canton) VALUES ('Jardín', 17);
INSERT INTO District (name, id_canton) VALUES ('Copey', 17);

-- Cantón Curridabat
INSERT INTO District (name, id_canton) VALUES ('Curridabat Centro', 18);
INSERT INTO District (name, id_canton) VALUES ('Granadilla', 18);
INSERT INTO District (name, id_canton) VALUES ('Sánchez', 18);
INSERT INTO District (name, id_canton) VALUES ('Tirrases', 18);

-- Cantón Pérez Zeledón
INSERT INTO District (name, id_canton) VALUES ('San Isidro de El General', 19);
INSERT INTO District (name, id_canton) VALUES ('El General', 19);
INSERT INTO District (name, id_canton) VALUES ('Daniel Flores', 19);
INSERT INTO District (name, id_canton) VALUES ('Rivas', 19);
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 19);
INSERT INTO District (name, id_canton) VALUES ('Platanares', 19);
INSERT INTO District (name, id_canton) VALUES ('Pejibaye', 19);
INSERT INTO District (name, id_canton) VALUES ('Cajón', 19);
INSERT INTO District (name, id_canton) VALUES ('Barú', 19);
INSERT INTO District (name, id_canton) VALUES ('Río Nuevo', 19);
INSERT INTO District (name, id_canton) VALUES ('Páramo', 19);
INSERT INTO District (name, id_canton) VALUES ('La Amistad', 19);

-- Cantón León Cortés
INSERT INTO District (name, id_canton) VALUES ('San Pablo', 20);
INSERT INTO District (name, id_canton) VALUES ('San Andrés', 20);
INSERT INTO District (name, id_canton) VALUES ('Llano Bonito', 20);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 20);
INSERT INTO District (name, id_canton) VALUES ('Santa Cruz', 20);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 20);



-- Cantón Alajuela
INSERT INTO District (name, id_canton) VALUES ('Alajuela', 21);
INSERT INTO District (name, id_canton) VALUES ('San José', 21);
INSERT INTO District (name, id_canton) VALUES ('Carrizal', 21);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 21);
INSERT INTO District (name, id_canton) VALUES ('Guácima', 21);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 21);
INSERT INTO District (name, id_canton) VALUES ('Sabanilla', 21);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 21);
INSERT INTO District (name, id_canton) VALUES ('Río Segundo', 21);
INSERT INTO District (name, id_canton) VALUES ('Desamparados', 21);
INSERT INTO District (name, id_canton) VALUES ('Turrúcares', 21);
INSERT INTO District (name, id_canton) VALUES ('Tambor', 21);
INSERT INTO District (name, id_canton) VALUES ('Garita', 21);
INSERT INTO District (name, id_canton) VALUES ('Sarapiquí', 21);

-- Cantón San Ramón
INSERT INTO District (name, id_canton) VALUES ('San Ramón', 22);
INSERT INTO District (name, id_canton) VALUES ('Santiago', 22);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 22);
INSERT INTO District (name, id_canton) VALUES ('Piedades Norte', 22);
INSERT INTO District (name, id_canton) VALUES ('Piedades Sur', 22);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 22);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 22);
INSERT INTO District (name, id_canton) VALUES ('Angeles', 22);
INSERT INTO District (name, id_canton) VALUES ('Alfaro', 22);
INSERT INTO District (name, id_canton) VALUES ('Volio', 22);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 22);
INSERT INTO District (name, id_canton) VALUES ('Zapotal', 22);
INSERT INTO District (name, id_canton) VALUES ('Peñas Blancas', 22);

-- Cantón Grecia
INSERT INTO District (name, id_canton) VALUES ('Grecia', 23);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 23);
INSERT INTO District (name, id_canton) VALUES ('San José', 23);
INSERT INTO District (name, id_canton) VALUES ('San Roque', 23);
INSERT INTO District (name, id_canton) VALUES ('Tacares', 23);
INSERT INTO District (name, id_canton) VALUES ('Puente de Piedra', 23);
INSERT INTO District (name, id_canton) VALUES ('Bolívar', 23);

-- Cantón San Mateo
INSERT INTO District (name, id_canton) VALUES ('San Mateo', 24);
INSERT INTO District (name, id_canton) VALUES ('Desmonte', 24);
INSERT INTO District (name, id_canton) VALUES ('Jesús María', 24);
INSERT INTO District (name, id_canton) VALUES ('Labrador', 24);

-- Cantón Atenas
INSERT INTO District (name, id_canton) VALUES ('Atenas', 25);
INSERT INTO District (name, id_canton) VALUES ('Jesús', 25);
INSERT INTO District (name, id_canton) VALUES ('Mercedes', 25);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 25);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 25);
INSERT INTO District (name, id_canton) VALUES ('San José', 25);
INSERT INTO District (name, id_canton) VALUES ('Santa Eulalia', 25);
INSERT INTO District (name, id_canton) VALUES ('Escobal', 25);

-- Cantón Naranjo
INSERT INTO District (name, id_canton) VALUES ('Naranjo', 26);
INSERT INTO District (name, id_canton) VALUES ('San Miguel', 26);
INSERT INTO District (name, id_canton) VALUES ('San José', 26);
INSERT INTO District (name, id_canton) VALUES ('Cirrí Sur', 26);
INSERT INTO District (name, id_canton) VALUES ('San Jerónimo', 26);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 26);
INSERT INTO District (name, id_canton) VALUES ('El Rosario', 26);
INSERT INTO District (name, id_canton) VALUES ('Palmitos', 26);

-- Cantón Palmares
INSERT INTO District (name, id_canton) VALUES ('Palmares', 27);
INSERT INTO District (name, id_canton) VALUES ('Zaragoza', 27);
INSERT INTO District (name, id_canton) VALUES ('Buenos Aires', 27);
INSERT INTO District (name, id_canton) VALUES ('Santiago', 27);
INSERT INTO District (name, id_canton) VALUES ('Candelaria', 27);
INSERT INTO District (name, id_canton) VALUES ('Esquipulas', 27);
INSERT INTO District (name, id_canton) VALUES ('La Granja', 27);

-- Cantón Poás
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 28);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 28);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 28);
INSERT INTO District (name, id_canton) VALUES ('Carrillos', 28);
INSERT INTO District (name, id_canton) VALUES ('Sabana Redonda', 28);

-- Cantón Orotina
INSERT INTO District (name, id_canton) VALUES ('Orotina', 29);
INSERT INTO District (name, id_canton) VALUES ('El Mastate', 29);
INSERT INTO District (name, id_canton) VALUES ('Hacienda Vieja', 29);
INSERT INTO District (name, id_canton) VALUES ('Coyolar', 29);
INSERT INTO District (name, id_canton) VALUES ('La Ceiba', 29);

-- Cantón San Carlos
INSERT INTO District (name, id_canton) VALUES ('Quesada', 30);
INSERT INTO District (name, id_canton) VALUES ('Florencia', 30);
INSERT INTO District (name, id_canton) VALUES ('Buenavista', 30);
INSERT INTO District (name, id_canton) VALUES ('Aguas Zarcas', 30);
INSERT INTO District (name, id_canton) VALUES ('Venecia', 30);
INSERT INTO District (name, id_canton) VALUES ('Pital', 30);
INSERT INTO District (name, id_canton) VALUES ('La Fortuna', 30);
INSERT INTO District (name, id_canton) VALUES ('La Tigra', 30);
INSERT INTO District (name, id_canton) VALUES ('La Palmera', 30);
INSERT INTO District (name, id_canton) VALUES ('Venado', 30);
INSERT INTO District (name, id_canton) VALUES ('Cutris', 30);
INSERT INTO District (name, id_canton) VALUES ('Monterrey', 30);
INSERT INTO District (name, id_canton) VALUES ('Pocosol', 30);

-- Cantón Zarcero
INSERT INTO District (name, id_canton) VALUES ('Zarcero', 31);
INSERT INTO District (name, id_canton) VALUES ('Laguna', 31);
INSERT INTO District (name, id_canton) VALUES ('Tapezco', 31);
INSERT INTO District (name, id_canton) VALUES ('Guadalupe', 31);
INSERT INTO District (name, id_canton) VALUES ('Palmira', 31);
INSERT INTO District (name, id_canton) VALUES ('Zapote', 31);
INSERT INTO District (name, id_canton) VALUES ('Brisas', 31);

-- Cantón Sarchí
INSERT INTO District (name, id_canton) VALUES ('Sarchí Norte', 32);
INSERT INTO District (name, id_canton) VALUES ('Sarchí Sur', 32);
INSERT INTO District (name, id_canton) VALUES ('Toro Amarillo', 32);
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 32);
INSERT INTO District (name, id_canton) VALUES ('Rodríguez', 32);

-- Cantón Upala
INSERT INTO District (name, id_canton) VALUES ('Upala', 33);
INSERT INTO District (name, id_canton) VALUES ('Aguas Claras', 33);
INSERT INTO District (name, id_canton) VALUES ('San José (Upala)', 33);
INSERT INTO District (name, id_canton) VALUES ('Bijagua', 33);
INSERT INTO District (name, id_canton) VALUES ('Delicias', 33);
INSERT INTO District (name, id_canton) VALUES ('Dos Ríos', 33);
INSERT INTO District (name, id_canton) VALUES ('Yolillal', 33);
INSERT INTO District (name, id_canton) VALUES ('Canalete', 33);

-- Cantón Los Chiles
INSERT INTO District (name, id_canton) VALUES ('Los Chiles', 34);
INSERT INTO District (name, id_canton) VALUES ('Caño Negro', 34);
INSERT INTO District (name, id_canton) VALUES ('El Amparo', 34);
INSERT INTO District (name, id_canton) VALUES ('San Jorge', 34);

-- Cantón Guatuso
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 35);
INSERT INTO District (name, id_canton) VALUES ('Buenavista', 35);
INSERT INTO District (name, id_canton) VALUES ('Cote', 35);
INSERT INTO District (name, id_canton) VALUES ('Katira', 35);

-- Cantón Río Cuarto
INSERT INTO District (name, id_canton) VALUES ('Río Cuarto', 36);
INSERT INTO District (name, id_canton) VALUES ('Santa Rita', 36);
INSERT INTO District (name, id_canton) VALUES ('Santa Isabel', 36);



-- Cantón Cartago
INSERT INTO District (name, id_canton) VALUES ('Oriental', 37);
INSERT INTO District (name, id_canton) VALUES ('Occidental', 37);
INSERT INTO District (name, id_canton) VALUES ('Carmen', 37);
INSERT INTO District (name, id_canton) VALUES ('San Nicolás', 37);
INSERT INTO District (name, id_canton) VALUES ('Aguacaliente (San Francisco)', 37);
INSERT INTO District (name, id_canton) VALUES ('Guadalupe (Arenilla)', 37);
INSERT INTO District (name, id_canton) VALUES ('Corralillo', 37);
INSERT INTO District (name, id_canton) VALUES ('Tierra Blanca', 37);
INSERT INTO District (name, id_canton) VALUES ('Dulce Nombre', 37);
INSERT INTO District (name, id_canton) VALUES ('Llano Grande', 37);
INSERT INTO District (name, id_canton) VALUES ('Quebradilla', 37);

-- Cantón Paraíso
INSERT INTO District (name, id_canton) VALUES ('Paraíso', 38);
INSERT INTO District (name, id_canton) VALUES ('Santiago', 38);
INSERT INTO District (name, id_canton) VALUES ('Orosi', 38);
INSERT INTO District (name, id_canton) VALUES ('Cachí', 38);
INSERT INTO District (name, id_canton) VALUES ('Llanos de Santa Lucía', 38);

-- Cantón La Unión
INSERT INTO District (name, id_canton) VALUES ('Tres Ríos', 39);
INSERT INTO District (name, id_canton) VALUES ('San Diego', 39);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 39);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 39);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 39);
INSERT INTO District (name, id_canton) VALUES ('Dulce Nombre', 39);
INSERT INTO District (name, id_canton) VALUES ('San Ramón', 39);
INSERT INTO District (name, id_canton) VALUES ('Río Azul', 39);

-- Cantón Jiménez
INSERT INTO District (name, id_canton) VALUES ('Juan Viñas', 40);
INSERT INTO District (name, id_canton) VALUES ('Tucurrique', 40);
INSERT INTO District (name, id_canton) VALUES ('Pejibaye', 40);

-- Cantón Turrialba
INSERT INTO District (name, id_canton) VALUES ('Turrialba', 41);
INSERT INTO District (name, id_canton) VALUES ('La Suiza', 41);
INSERT INTO District (name, id_canton) VALUES ('Peralta', 41);
INSERT INTO District (name, id_canton) VALUES ('Santa Cruz', 41);
INSERT INTO District (name, id_canton) VALUES ('Santa Teresita', 41);
INSERT INTO District (name, id_canton) VALUES ('Pavones', 41);
INSERT INTO District (name, id_canton) VALUES ('Tuis', 41);
INSERT INTO District (name, id_canton) VALUES ('Tayutic', 41);
INSERT INTO District (name, id_canton) VALUES ('Santa Rosa', 41);
INSERT INTO District (name, id_canton) VALUES ('Tres Equis', 41);
INSERT INTO District (name, id_canton) VALUES ('La Isabel', 41);
INSERT INTO District (name, id_canton) VALUES ('Chirripó', 41);

-- Cantón Alvarado
INSERT INTO District (name, id_canton) VALUES ('Pacayas', 42);
INSERT INTO District (name, id_canton) VALUES ('Cervantes', 42);
INSERT INTO District (name, id_canton) VALUES ('Capellades', 42);

-- Cantón Oreamuno
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 43);
INSERT INTO District (name, id_canton) VALUES ('Cot', 43);
INSERT INTO District (name, id_canton) VALUES ('Potrero Cerrado', 43);
INSERT INTO District (name, id_canton) VALUES ('Cipreses', 43);
INSERT INTO District (name, id_canton) VALUES ('Santa Rosa', 43);

-- Cantón El Guarco
INSERT INTO District (name, id_canton) VALUES ('El Tejar', 44);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 44);
INSERT INTO District (name, id_canton) VALUES ('Tobosi', 44);
INSERT INTO District (name, id_canton) VALUES ('Patio de Agua', 44);


-- Cantón Heredia
INSERT INTO District (name, id_canton) VALUES ('Heredia', 45);
INSERT INTO District (name, id_canton) VALUES ('Mercedes', 45);
INSERT INTO District (name, id_canton) VALUES ('San Francisco', 45);
INSERT INTO District (name, id_canton) VALUES ('Ulloa', 45);
INSERT INTO District (name, id_canton) VALUES ('Varablanca', 45);

-- Cantón Barva
INSERT INTO District (name, id_canton) VALUES ('Barva', 46);
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 46);
INSERT INTO District (name, id_canton) VALUES ('San Pablo', 46);
INSERT INTO District (name, id_canton) VALUES ('San Roque', 46);
INSERT INTO District (name, id_canton) VALUES ('Santa Lucía', 46);
INSERT INTO District (name, id_canton) VALUES ('San José de la Montaña', 46);

-- Cantón Santo Domingo
INSERT INTO District (name, id_canton) VALUES ('Santo Domingo', 47);
INSERT INTO District (name, id_canton) VALUES ('San Vicente', 47);
INSERT INTO District (name, id_canton) VALUES ('San Miguel', 47);
INSERT INTO District (name, id_canton) VALUES ('Paracito', 47);
INSERT INTO District (name, id_canton) VALUES ('Santo Tomás', 47);
INSERT INTO District (name, id_canton) VALUES ('Santa Rosa', 47);
INSERT INTO District (name, id_canton) VALUES ('Tures', 47);
INSERT INTO District (name, id_canton) VALUES ('Pará', 47);

-- Cantón Santa Bárbara
INSERT INTO District (name, id_canton) VALUES ('Santa Bárbara', 48);
INSERT INTO District (name, id_canton) VALUES ('San Pedro', 48);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 48);
INSERT INTO District (name, id_canton) VALUES ('Jesús', 48);
INSERT INTO District (name, id_canton) VALUES ('Santo Domingo', 48);
INSERT INTO District (name, id_canton) VALUES ('Purabá', 48);

-- Cantón San Rafael
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 49);
INSERT INTO District (name, id_canton) VALUES ('San Josecito', 49);
INSERT INTO District (name, id_canton) VALUES ('Santiago', 49);
INSERT INTO District (name, id_canton) VALUES ('Los Ángeles', 49);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 49);

-- Cantón San Isidro
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 50);
INSERT INTO District (name, id_canton) VALUES ('San José', 50);
INSERT INTO District (name, id_canton) VALUES ('Concepción', 50);
INSERT INTO District (name, id_canton) VALUES ('San Francisco', 50);

-- Cantón Belén
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 51);
INSERT INTO District (name, id_canton) VALUES ('La Ribera', 51);
INSERT INTO District (name, id_canton) VALUES ('La Asunción', 51);

-- Cantón Flores
INSERT INTO District (name, id_canton) VALUES ('San Joaquín', 52);
INSERT INTO District (name, id_canton) VALUES ('Barrantes', 52);
INSERT INTO District (name, id_canton) VALUES ('Llorente', 52);

-- Cantón San Pablo
INSERT INTO District (name, id_canton) VALUES ('San Pablo', 53);
INSERT INTO District (name, id_canton) VALUES ('Rincón de Sabanilla', 53);

-- Cantón Sarapiquí
INSERT INTO District (name, id_canton) VALUES ('Puerto Viejo', 54);
INSERT INTO District (name, id_canton) VALUES ('La Virgen', 54);
INSERT INTO District (name, id_canton) VALUES ('Horquetas', 54);
INSERT INTO District (name, id_canton) VALUES ('Llanuras del Gaspar', 54);
INSERT INTO District (name, id_canton) VALUES ('Cureña', 54);


-- Cantón Liberia
INSERT INTO District (name, id_canton) VALUES ('Liberia', 55);
INSERT INTO District (name, id_canton) VALUES ('Cañas Dulces', 55);
INSERT INTO District (name, id_canton) VALUES ('Mayorga', 55);
INSERT INTO District (name, id_canton) VALUES ('Nacascolo', 55);
INSERT INTO District (name, id_canton) VALUES ('Curubandé', 55);

-- Cantón Nicoya
INSERT INTO District (name, id_canton) VALUES ('Nicoya', 56);
INSERT INTO District (name, id_canton) VALUES ('Mansión', 56);
INSERT INTO District (name, id_canton) VALUES ('San Antonio', 56);
INSERT INTO District (name, id_canton) VALUES ('Quebrada Honda', 56);
INSERT INTO District (name, id_canton) VALUES ('Sámara', 56);
INSERT INTO District (name, id_canton) VALUES ('Nosara', 56);
INSERT INTO District (name, id_canton) VALUES ('Belén de Nosarita', 56);

-- Cantón Santa Cruz
INSERT INTO District (name, id_canton) VALUES ('Santa Cruz', 57);
INSERT INTO District (name, id_canton) VALUES ('Bolsón', 57);
INSERT INTO District (name, id_canton) VALUES ('Veintisiete de Abril', 57);
INSERT INTO District (name, id_canton) VALUES ('Tempate', 57);
INSERT INTO District (name, id_canton) VALUES ('Cartagena', 57);
INSERT INTO District (name, id_canton) VALUES ('Cuajiniquil', 57);
INSERT INTO District (name, id_canton) VALUES ('Diriá', 57);
INSERT INTO District (name, id_canton) VALUES ('Cabo Velas', 57);
INSERT INTO District (name, id_canton) VALUES ('Tamarindo', 57);

-- Cantón Bagaces
INSERT INTO District (name, id_canton) VALUES ('Bagaces', 58);
INSERT INTO District (name, id_canton) VALUES ('La Fortuna', 58);
INSERT INTO District (name, id_canton) VALUES ('Mogote', 58);
INSERT INTO District (name, id_canton) VALUES ('Río Naranjo', 58);

-- Cantón Carrillo
INSERT INTO District (name, id_canton) VALUES ('Filadelfia', 59);
INSERT INTO District (name, id_canton) VALUES ('Palmira', 59);
INSERT INTO District (name, id_canton) VALUES ('Sardinal', 59);
INSERT INTO District (name, id_canton) VALUES ('Belén', 59);

-- Cantón Cañas
INSERT INTO District (name, id_canton) VALUES ('Cañas', 60);
INSERT INTO District (name, id_canton) VALUES ('Palmira', 60);
INSERT INTO District (name, id_canton) VALUES ('San Miguel', 60);
INSERT INTO District (name, id_canton) VALUES ('Bebedero', 60);
INSERT INTO District (name, id_canton) VALUES ('Porozal', 60);

-- Cantón Abangares
INSERT INTO District (name, id_canton) VALUES ('Las Juntas', 61);
INSERT INTO District (name, id_canton) VALUES ('Sierra', 61);
INSERT INTO District (name, id_canton) VALUES ('San Juan', 61);
INSERT INTO District (name, id_canton) VALUES ('Colorado', 61);

-- Cantón Tilarán
INSERT INTO District (name, id_canton) VALUES ('Tilarán', 62);
INSERT INTO District (name, id_canton) VALUES ('Quebrada Grande', 62);
INSERT INTO District (name, id_canton) VALUES ('Tronadora', 62);
INSERT INTO District (name, id_canton) VALUES ('Santa Rosa', 62);
INSERT INTO District (name, id_canton) VALUES ('Líbano', 62);
INSERT INTO District (name, id_canton) VALUES ('Tierras Morenas', 62);
INSERT INTO District (name, id_canton) VALUES ('Arenal', 62);

-- Cantón Nandayure
INSERT INTO District (name, id_canton) VALUES ('Carmona', 63);
INSERT INTO District (name, id_canton) VALUES ('Santa Rita', 63);
INSERT INTO District (name, id_canton) VALUES ('Zapotal', 63);
INSERT INTO District (name, id_canton) VALUES ('San Pablo', 63);
INSERT INTO District (name, id_canton) VALUES ('Porvenir', 63);
INSERT INTO District (name, id_canton) VALUES ('Bejuco', 63);

-- Cantón La Cruz
INSERT INTO District (name, id_canton) VALUES ('La Cruz', 64);
INSERT INTO District (name, id_canton) VALUES ('Santa Cecilia', 64);
INSERT INTO District (name, id_canton) VALUES ('La Garita', 64);
INSERT INTO District (name, id_canton) VALUES ('Santa Elena', 64);

-- Cantón Hojancha
INSERT INTO District (name, id_canton) VALUES ('Hojancha', 65);
INSERT INTO District (name, id_canton) VALUES ('Monte Romo', 65);
INSERT INTO District (name, id_canton) VALUES ('Puerto Carrillo', 65);
INSERT INTO District (name, id_canton) VALUES ('Huacas', 65);


-- Cantón Puntarenas
INSERT INTO District (name, id_canton) VALUES ('Puntarenas', 66);
INSERT INTO District (name, id_canton) VALUES ('Pitahaya', 66);
INSERT INTO District (name, id_canton) VALUES ('Chomes', 66);
INSERT INTO District (name, id_canton) VALUES ('Lepanto', 66);
INSERT INTO District (name, id_canton) VALUES ('Paquera', 66);
INSERT INTO District (name, id_canton) VALUES ('Manzanillo', 66);
INSERT INTO District (name, id_canton) VALUES ('Guacimal', 66);
INSERT INTO District (name, id_canton) VALUES ('Barranca', 66);
INSERT INTO District (name, id_canton) VALUES ('Monte Verde', 66);
INSERT INTO District (name, id_canton) VALUES ('Isla del Coco', 66);
INSERT INTO District (name, id_canton) VALUES ('Cóbano', 66);
INSERT INTO District (name, id_canton) VALUES ('Chacarita', 66);
INSERT INTO District (name, id_canton) VALUES ('Chira', 66);
INSERT INTO District (name, id_canton) VALUES ('Acapulco', 66);
INSERT INTO District (name, id_canton) VALUES ('El Roble', 66);
INSERT INTO District (name, id_canton) VALUES ('Arancibia', 66);

-- Cantón Esparza
INSERT INTO District (name, id_canton) VALUES ('Espíritu Santo', 67);
INSERT INTO District (name, id_canton) VALUES ('San Juan Grande', 67);
INSERT INTO District (name, id_canton) VALUES ('Macacona', 67);
INSERT INTO District (name, id_canton) VALUES ('San Rafael', 67);
INSERT INTO District (name, id_canton) VALUES ('San Jerónimo', 67);
INSERT INTO District (name, id_canton) VALUES ('Caldera', 67);

-- Cantón Buenos Aires
INSERT INTO District (name, id_canton) VALUES ('Buenos Aires', 68);
INSERT INTO District (name, id_canton) VALUES ('Volcán', 68);
INSERT INTO District (name, id_canton) VALUES ('Potrero Grande', 68);
INSERT INTO District (name, id_canton) VALUES ('Boruca', 68);
INSERT INTO District (name, id_canton) VALUES ('Pilas', 68);
INSERT INTO District (name, id_canton) VALUES ('Colinas', 68);
INSERT INTO District (name, id_canton) VALUES ('Chánguena', 68);
INSERT INTO District (name, id_canton) VALUES ('Biolley', 68);
INSERT INTO District (name, id_canton) VALUES ('Brunka', 68);

-- Cantón Montes de Oro
INSERT INTO District (name, id_canton) VALUES ('Miramar', 69);
INSERT INTO District (name, id_canton) VALUES ('La Unión', 69);
INSERT INTO District (name, id_canton) VALUES ('San Isidro', 69);

-- Cantón Osa
INSERT INTO District (name, id_canton) VALUES ('Puerto Cortés', 70);
INSERT INTO District (name, id_canton) VALUES ('Palmar', 70);
INSERT INTO District (name, id_canton) VALUES ('Sierpe', 70);
INSERT INTO District (name, id_canton) VALUES ('Bahía Ballena', 70);
INSERT INTO District (name, id_canton) VALUES ('Piedras Blancas', 70);
INSERT INTO District (name, id_canton) VALUES ('Bahía Drake', 70);

-- Cantón Quepos
INSERT INTO District (name, id_canton) VALUES ('Quepos', 71);
INSERT INTO District (name, id_canton) VALUES ('Savegre', 71);
INSERT INTO District (name, id_canton) VALUES ('Naranjito', 71);

-- Cantón Golfito
INSERT INTO District (name, id_canton) VALUES ('Golfito', 72);
INSERT INTO District (name, id_canton) VALUES ('Puerto Jiménez', 72);
INSERT INTO District (name, id_canton) VALUES ('Guaycará', 72);
INSERT INTO District (name, id_canton) VALUES ('Pavón', 72);

-- Cantón Coto Brus
INSERT INTO District (name, id_canton) VALUES ('San Vito', 73);
INSERT INTO District (name, id_canton) VALUES ('Sabalito', 73);
INSERT INTO District (name, id_canton) VALUES ('Aguabuena', 73);
INSERT INTO District (name, id_canton) VALUES ('Limoncito', 73);
INSERT INTO District (name, id_canton) VALUES ('Pittier', 73);

-- Cantón Parrita
INSERT INTO District (name, id_canton) VALUES ('Parrita', 74);

-- Cantón Corredores
INSERT INTO District (name, id_canton) VALUES ('Corredor', 75);
INSERT INTO District (name, id_canton) VALUES ('La Cuesta', 75);
INSERT INTO District (name, id_canton) VALUES ('Canoas', 75);
INSERT INTO District (name, id_canton) VALUES ('Laurel', 75);

-- Cantón Garabito
INSERT INTO District (name, id_canton) VALUES ('Jacó', 76);
INSERT INTO District (name, id_canton) VALUES ('Tárcoles', 76);



-- Cantón Limón
INSERT INTO District (name, id_canton) VALUES ('Limón', 77);
INSERT INTO District (name, id_canton) VALUES ('Valle La Estrella', 77);
INSERT INTO District (name, id_canton) VALUES ('Río Blanco', 77);
INSERT INTO District (name, id_canton) VALUES ('Matama', 77);

-- Cantón Pococí
INSERT INTO District (name, id_canton) VALUES ('Guápiles', 78);
INSERT INTO District (name, id_canton) VALUES ('Jiménez', 78);
INSERT INTO District (name, id_canton) VALUES ('Rita', 78);
INSERT INTO District (name, id_canton) VALUES ('Roxana', 78);
INSERT INTO District (name, id_canton) VALUES ('Cariari', 78);
INSERT INTO District (name, id_canton) VALUES ('Colorado', 78);
INSERT INTO District (name, id_canton) VALUES ('La Colonia', 78);

-- Cantón Siquirres
INSERT INTO District (name, id_canton) VALUES ('Siquirres', 79);
INSERT INTO District (name, id_canton) VALUES ('Pacuarito', 79);
INSERT INTO District (name, id_canton) VALUES ('Florida', 79);
INSERT INTO District (name, id_canton) VALUES ('Germania', 79);
INSERT INTO District (name, id_canton) VALUES ('El Cairo', 79);
INSERT INTO District (name, id_canton) VALUES ('Alegría', 79);

-- Cantón Talamanca
INSERT INTO District (name, id_canton) VALUES ('Bratsi', 80);
INSERT INTO District (name, id_canton) VALUES ('Sixaola', 80);
INSERT INTO District (name, id_canton) VALUES ('Cahuita', 80);
INSERT INTO District (name, id_canton) VALUES ('Telire', 80);

-- Cantón Matina
INSERT INTO District (name, id_canton) VALUES ('Matina', 81);
INSERT INTO District (name, id_canton) VALUES ('Batán', 81);
INSERT INTO District (name, id_canton) VALUES ('Carrandí', 81);

-- Cantón Guácimo
INSERT INTO District (name, id_canton) VALUES ('Guácimo', 82);
INSERT INTO District (name, id_canton) VALUES ('Mercedes', 82);
INSERT INTO District (name, id_canton) VALUES ('Pocora', 82);
INSERT INTO District (name, id_canton) VALUES ('Río Jiménez', 82);
INSERT INTO District (name, id_canton) VALUES ('Duacarí', 82);


