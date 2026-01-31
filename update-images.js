require('dotenv').config();
const pool = require('./database');

async function updateImagePaths() {
  try {
    console.log('Updating image paths...');
    
    // Update Ferrari - используем Lamborghini Aventador (красивый спортивный)
    const updateFerrariQuery = `
      UPDATE public.inventory
      SET inv_image = '/images/vehicles/adventador.jpg',
          inv_thumbnail = '/images/vehicles/adventador-tn.jpg'
      WHERE inv_make = 'Ferrari' AND inv_model = 'Roma';
    `;
    await pool.query(updateFerrariQuery);
    console.log('✓ Ferrari Roma paths updated');
    
    // Update Hummer - должны быть уже правильные пути, но проверим
    const updateHummerQuery = `
      UPDATE public.inventory
      SET inv_image = '/images/vehicles/hummer.jpg',
          inv_thumbnail = '/images/vehicles/hummer-tn.jpg'
      WHERE inv_make = 'GM' AND inv_model = 'Hummer';
    `;
    await pool.query(updateHummerQuery);
    console.log('✓ GM Hummer paths updated');
    
    // Verify data
    const verifyQuery = `SELECT inv_id, inv_make, inv_model, inv_image, inv_thumbnail FROM public.inventory;`;
    const result = await pool.query(verifyQuery);
    console.log('✓ Updated inventory:');
    console.table(result.rows);
    
    process.exit(0);
  } catch (error) {
    console.error('✗ Update failed:', error);
    process.exit(1);
  }
}

updateImagePaths();
