require('dotenv').config()
const pool = require('./database')

async function migrate() {
  try {
    console.log('Adding columns...')
    
    const addColumnsQuery = `
      ALTER TABLE public.inventory
      ADD COLUMN IF NOT EXISTS inv_price DECIMAL(10, 2),
      ADD COLUMN IF NOT EXISTS inv_year INT,
      ADD COLUMN IF NOT EXISTS inv_miles INT,
      ADD COLUMN IF NOT EXISTS inv_color VARCHAR(50);
    `
    await pool.query(addColumnsQuery)
    console.log('Columns updated')

    const addWishlistQuery = `
      CREATE TABLE IF NOT EXISTS wishlist (
        wishlist_id SERIAL PRIMARY KEY,
        account_id INT REFERENCES account(account_id) ON DELETE CASCADE,
        inv_id INT REFERENCES inventory(inv_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (account_id, inv_id)
      );
    `
    await pool.query(addWishlistQuery)
    console.log('Wishlist table ensured')
    
    const updateFerrariQuery = `
      UPDATE public.inventory
      SET inv_price = 150000.00,
          inv_year = 2023,
          inv_miles = 5000,
          inv_color = 'Red'
      WHERE inv_make = 'Ferrari' AND inv_model = 'Roma';
    `
    await pool.query(updateFerrariQuery)
    console.log('Ferrari updated')
    
    const updateHummerQuery = `
      UPDATE public.inventory
      SET inv_price = 12500.00,
          inv_year = 2020,
          inv_miles = 45678,
          inv_color = 'Black'
      WHERE inv_make = 'GM' AND inv_model = 'Hummer';
    `
    await pool.query(updateHummerQuery)
    console.log('Hummer updated')
    
    const verifyQuery = `SELECT * FROM public.inventory;`
    const result = await pool.query(verifyQuery)
    console.log('Done')
    console.table(result.rows)
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

migrate()
