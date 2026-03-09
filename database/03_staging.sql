CREATE VIEW stg_transactions AS (
    SELECT
        id AS transaction_id,
        transaction_date,
        UPPER(TRIM(dealer_code)) AS dealer_code,
        INITCAP(TRIM(dealer_name)) AS dealer_name,
        UPPER(TRIM(region_code)) AS region_code,
        INITCAP(TRIM(region_name)) AS region_name,
        product_sku,
        INITCAP(TRIM(product_name)) AS product_name,
        LOWER(TRIM(product_category)) AS product_category,
        quantity,
        unit_price,
        total_amount,
        LOWER(TRIM(transaction_type)) AS transaction_type,
        LOWER(TRIM(customer_type)) AS customer_type,
        ingested_at,
        source_file
    FROM raw_transactions
    WHERE
        transaction_date IS NOT NULL
        AND dealer_code IS NOT NULL
        AND region_code IS NOT NULL
        AND product_sku IS NOT NULL
        AND transaction_type IS NOT NULL
        AND customer_type IS NOT NULL
        AND quantity > 0
        AND unit_price > 0
        AND total_amount > 0
);