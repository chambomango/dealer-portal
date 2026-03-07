from datetime import date, timedelta
import random

""" 
Generates 2000 random transactioins and outputs the SQL INSERT statement
for the raw_transactions table.
Run with: python seed_data.py > seed_output.sql
"""

dealers = {
    "D-001": ("Metro Wireless", "NE"),
    "D-002": ("Valley Mobile", "SE"),
    "D-003": ("Peak Telecom", "MW"),
    "D-004": ("Sunrise Communications", "SW"),
    "D-005": ("Pacific Connect", "NW"),
    "D-006": ("Gulf Wireless", "SO"),
    "D-007": ("Harbor Mobile", "NE"),
    "D-008": ("Coastal Telecom", "SE"),
    "D-009": ("Prairie Wireless", "MW"),
    "D-010": ("Desert Connect", "SW"),
    "D-011": ("Alpine Mobile", "NW"),
    "D-012": ("Bayou Telecom", "SO"),
    "D-013": ("Liberty Wireless", "NE"),
    "D-014": ("Magnolia Mobile", "SE"),
    "D-015": ("Heartland Telecom", "MW"),
}

regions = {"NE": "Northeast", "SE": "Southeast", "MW": "Midwest", "SW": "Southwest", "NW": "Northwest", "SO": "South"}

products = [
    ("PH-001", "Apple iPhone", "handset", 999.99),
    ("PH-002", "Samsung Galaxy", "handset", 899.99),
    ("PH-003", "Google Pixel", "handset", 799.99),
    ("PH-004", "Budget Phone", "handset", 399.99),
    ("PL-001", "Unlimited Plan", "plan", 75.00),
    ("PL-002", "Basic Plan", "plan", 45.00),
    ("PL-003", "Family Plan", "plan", 120.00),
    ("PL-004", "Business Plan", "plan", 150.00),
    ("AC-001", "Screen Protector", "accessory", 29.99),
    ("AC-002", "Wireless Charger", "accessory", 49.99),
    ("AC-003", "Headphones", "accessory", 79.99),
]

transaction_types = ["new_sale", "upgrade", "renewal", "online_pickup"]

customer_types = ["consumer", "business"]


START_DATE = date(2024, 9, 1)
END_DATE = date(2025, 2, 28)
date_range = (END_DATE - START_DATE).days  # 181 days

final_sql_statement ="""
INSERT INTO raw_transactions
    (transaction_date, dealer_code, dealer_name, region_code, region_name,
     product_sku, product_name, product_category, quantity, unit_price,
     total_amount, transaction_type, customer_type, source_file)
VALUES 
"""

values_rows = []

for i in range(2000):
    dealer_code = random.choice(list(dealers.keys()))
    dealer_name = dealers[dealer_code][0]
    region_code = dealers[dealer_code][1]
    region_name = regions[region_code]
    product =  random.choice(products)
    product_code = product[0]
    product_name = product[1]
    product_type = product[2]
    product_price = product[3]
    product_quantity = random.randint(1,5)
    product_total = round(product_price * product_quantity, 2)
    transaction_type = random.choice(transaction_types)
    customer_type = random.choice(customer_types)
    row_date = START_DATE + timedelta(days=random.randint(0, date_range))
    source_file = f"daily_{row_date.strftime('%Y_%m_%d')}.csv"

    #Artificially tank February sales for dealer 1
    if dealer_code == "D-001" and row_date.month == 2: product_total = round(product_total * 0.3, 2)
        
    values_rows.append(
        f"('{row_date}', '{dealer_code}', '{dealer_name}', "
        f"'{region_code}', '{region_name}', "
        f"'{product_code}', '{product_name}', '{product_type}', "
        f"{product_quantity}, {product_price}, {product_total}, "
        f"'{transaction_type}', '{customer_type}', '{source_file}')"
)

final_sql_statement = final_sql_statement + ",\n".join(values_rows) + ";"

print(final_sql_statement)