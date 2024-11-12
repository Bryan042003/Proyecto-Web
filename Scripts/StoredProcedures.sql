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


