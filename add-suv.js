require('dotenv').config();
const pool = require('./database');

async function addSUV() {
  try {
    console.log('Adding SUV...')
    
    const insertQuery = `
      INSERT INTO public.inventory (
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
    `;
    await pool.query(insertQuery)
    console.log('Escalade added')
    
    const verifyQuery = `
      SELECT i.inv_id, i.inv_make, i.inv_model, c.classification_name 
      FROM public.inventory i
      JOIN public.classification c ON i.classification_id = c.classification_id
      ORDER BY c.classification_name;
    `
    const result = await pool.query(verifyQuery)
    console.log('Inventory:')
    console.table(result.rows)
    
    process.exit(0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1);
  }
}

addSUV();
