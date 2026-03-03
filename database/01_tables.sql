CREATE TABLE raw_transactions (
    id              SERIAL PRIMARY KEY,
    transaction_date DATE,
    dealer_code     VARCHAR(20),
    dealer_name     VARCHAR(100),
    region_code     VARCHAR(10),
    region_name     VARCHAR(50),
    product_sku     VARCHAR(20),
    product_name    VARCHAR(100),
    product_category VARCHAR(50),
    quantity        INTEGER,
    unit_price      NUMERIC(10,2),
    total_amount    NUMERIC(12,2),
    transaction_type VARCHAR(20),
    customer_type   VARCHAR(20),
    ingested_at     TIMESTAMP DEFAULT NOW(),
    source_file     VARCHAR(100)
);