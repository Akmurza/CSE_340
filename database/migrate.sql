-- Migration: Add new columns to inventory table
-- Check if columns exist and add them if not
ALTER TABLE public.inventory
ADD COLUMN IF NOT EXISTS inv_price DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS inv_year INT,
    ADD COLUMN IF NOT EXISTS inv_miles INT,
    ADD COLUMN IF NOT EXISTS inv_color VARCHAR(50);
-- Update Ferrari Roma data
UPDATE public.inventory
SET inv_price = 150000.00,
    inv_year = 2023,
    inv_miles = 5000,
    inv_color = 'Red'
WHERE inv_make = 'Ferrari'
    AND inv_model = 'Roma';
-- Update GM Hummer data
UPDATE public.inventory
SET inv_price = 12500.00,
    inv_year = 2020,
    inv_miles = 45678,
    inv_color = 'Black'
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';

-- Add wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES account(account_id) ON DELETE CASCADE,
    inv_id INT REFERENCES inventory(inv_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (account_id, inv_id)
);