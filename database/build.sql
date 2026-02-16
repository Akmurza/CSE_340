-- 1. TYPE
CREATE TYPE account_type_enum AS ENUM ('Client', 'Employee', 'Admin');
-- 2. ACCOUNT TABLE
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname VARCHAR(50) NOT NULL,
  account_lastname VARCHAR(50) NOT NULL,
  account_email VARCHAR(100) UNIQUE NOT NULL,
  account_password VARCHAR(255) NOT NULL,
  account_type account_type_enum DEFAULT 'Client'
);
-- 3. CLASSIFICATION TABLE
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name VARCHAR(50) NOT NULL
);
-- 4. INVENTORY TABLE
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make VARCHAR(50),
  inv_model VARCHAR(50),
  inv_description TEXT,
  inv_image TEXT,
  inv_thumbnail TEXT,
  inv_price DECIMAL(10, 2),
  inv_year INT,
  inv_miles INT,
  inv_color VARCHAR(50),
  classification_id INT REFERENCES classification(classification_id)
);
-- 4a. WISHLIST TABLE
CREATE TABLE wishlist (
  wishlist_id SERIAL PRIMARY KEY,
  account_id INT REFERENCES account(account_id) ON DELETE CASCADE,
  inv_id INT REFERENCES inventory(inv_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (account_id, inv_id)
);
-- 5. INSERT CLASSIFICATIONS
INSERT INTO classification (classification_name)
VALUES ('Sport'),
  ('SUV'),
  ('Truck');
-- 6. INSERT INVENTORY
INSERT INTO inventory (
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )
VALUES (
    'GM',
    'Hummer',
    'a huge interior',
    '/images/vehicles/hummer.jpg',
    '/images/vehicles/hummer-tn.jpg',
    12500.00,
    2020,
    45678,
    'Black',
    3
  ),
  (
    'Ferrari',
    'Roma',
    'fast sport car',
    '/images/vehicles/adventador.jpg',
    '/images/vehicles/adventador-tn.jpg',
    150000.00,
    2023,
    5000,
    'Red',
    1
  ),
  (
    'Cadillac',
    'Escalade',
    'luxury SUV with spacious interior',
    '/images/vehicles/escalade.jpg',
    '/images/vehicles/escalade-tn.jpg',
    65000.00,
    2022,
    28500,
    'White',
    2
  );
-- 7. Update image paths
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');