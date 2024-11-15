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



