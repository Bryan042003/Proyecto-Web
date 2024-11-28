DELIMITER $$

CREATE PROCEDURE GetProductsByCategory(IN parent_category_id INT)
BEGIN
    WITH RECURSIVE Subcategories AS (
        -- Seleccionamos la categoría padre inicial
        SELECT id FROM Category WHERE id = parent_category_id
        UNION ALL
        -- Recursivamente obtenemos las subcategorías
        SELECT c.id
        FROM Category c
        INNER JOIN Subcategories s ON c.parent_id = s.id
    )
    SELECT p.*
    FROM Product p
    INNER JOIN Product_Category pc ON p.id = pc.id_product
    INNER JOIN Subcategories sc ON pc.id_category = sc.id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetProductsByCategoryAndBrand(
    IN parent_category_id INT,
    IN brand_name VARCHAR(100)
)
BEGIN
    WITH RECURSIVE Subcategories AS (
        
        SELECT id FROM Category WHERE id = parent_category_id
        UNION ALL
      
        SELECT c.id
        FROM Category c
        INNER JOIN Subcategories s ON c.parent_id = s.id
    )
    SELECT p.*
    FROM Product p
    INNER JOIN Product_Category pc ON p.id = pc.id_product
    INNER JOIN Subcategories sc ON pc.id_category = sc.id
    WHERE p.brand = brand_name;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetProductsByCategoryAndPrice(
    IN parent_category_id INT,
    IN min_price DOUBLE,
    IN max_price DOUBLE
)
BEGIN
    WITH RECURSIVE Subcategories AS (
       
        SELECT id FROM Category WHERE id = parent_category_id
        UNION ALL
      
        SELECT c.id
        FROM Category c
        INNER JOIN Subcategories s ON c.parent_id = s.id
    )
    SELECT p.*
    FROM Product p
    INNER JOIN Product_Category pc ON p.id = pc.id_product
    INNER JOIN Subcategories sc ON pc.id_category = sc.id
    WHERE p.price BETWEEN min_price AND max_price;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetTopSellingProductsByCategory(
    IN parent_category_id INT,
    IN limit_results INT
)
BEGIN
    WITH RECURSIVE Subcategories AS (
       
        SELECT id FROM Category WHERE id = parent_category_id
        UNION ALL
    
        SELECT c.id
        FROM Category c
        INNER JOIN Subcategories s ON c.parent_id = s.id
    )
    SELECT p.*
    FROM Product p
    INNER JOIN Product_Category pc ON p.id = pc.id_product
    INNER JOIN Subcategories sc ON pc.id_category = sc.id
    ORDER BY p.n_sales DESC
    LIMIT limit_results;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetActiveHighlightedProducts()
BEGIN
    SELECT p.*
    FROM Product p
    INNER JOIN Highlight h ON p.id = h.id_product
    WHERE h.expired_date >= CURDATE();
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE DeleteProductCascade(IN product_id INT)
BEGIN
    DECLARE status_code INT;
    DECLARE message VARCHAR(255);

    -- Verificar si el producto existe
    IF NOT EXISTS (SELECT 1 FROM Product WHERE id = product_id) THEN
        SET status_code = -1;
        SET message = 'El producto no existe.';
    -- Verificar si el producto tiene órdenes asociadas
    ELSEIF EXISTS (SELECT 1 FROM Order_Product WHERE id_product = product_id) THEN
        SET status_code = 0;
        SET message = 'No se puede eliminar el producto porque tiene órdenes asociadas.';
    ELSE
        -- Iniciar una transacción para asegurar la integridad de los datos
        START TRANSACTION;

        -- Eliminar entradas de Review relacionadas con el producto
        DELETE FROM Review WHERE id_product = product_id;

        -- Eliminar entradas de Highlight relacionadas con el producto
        DELETE FROM Highlight WHERE id_product = product_id;

        -- Eliminar entradas de Notification relacionadas con el producto
        DELETE FROM Notification WHERE id_product = product_id;

        -- Eliminar entradas de Product_Category relacionadas con el producto
        DELETE FROM Product_Category WHERE id_product = product_id;

        -- Eliminar el producto
        DELETE FROM Product WHERE id = product_id;

        -- Confirmar la transacción
        COMMIT;

        SET status_code = 1;
        SET message = 'Producto y datos relacionados eliminados exitosamente.';
    END IF;

    -- Devolver los valores de status_code y message
    SELECT status_code AS status_code, message AS message;
END $$

DELIMITER ;


