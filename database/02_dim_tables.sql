CREATE TABLE dim_regions (
    region_id SERIAL PRIMARY KEY,
    region_code VARCHAR(5) UNIQUE NOT NULL,
    region_name VARCHAR,
    territory VARCHAR
);

CREATE TABLE dim_dealers (
    dealer_id SERIAL PRIMARY KEY,
    dealer_code VARCHAR(10) UNIQUE NOT NULL,
    dealer_name VARCHAR,
    region_id INTEGER REFERENCES dim_regions(region_id),
    onboarded_date DATE,
    is_active BOOLEAN DEFAULT true
);


INSERT INTO dim_regions (region_code, region_name, territory)
SELECT DISTINCT 
    region_code, 
    region_name, 
    (
        CASE WHEN region_code in ('NE', 'SE') THEN 'East' 
        WHEN region_code in ('NW', 'SW') THEN 'West'
        WHEN region_code in ('SO', 'MW') THEN 'Central'
        END
    )
FROM raw_transactions;


INSERT INTO dim_dealers (dealer_code, dealer_name, region_id, onboarded_date)
SELECT
    rt.dealer_code, 
    rt.dealer_name, 
    dr.region_id,
    DATE '2023-01-01' + CAST(FLOOR(RANDOM() * (DATE '2023-12-31' - DATE '2023-01-01' + 1)) AS INT)
FROM (
    SELECT DISTINCT
        dealer_code, 
        dealer_name,
        region_code
    FROM
        raw_transactions
) rt
JOIN dim_regions dr ON rt.region_code = dr.region_code