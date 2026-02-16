const pool = require("../database/")

async function getWishlistByAccountId(account_id) {
  try {
    const sql = `SELECT w.inv_id, w.account_id, w.created_at,
      i.inv_make, i.inv_model, i.inv_price, i.inv_thumbnail
      FROM wishlist w
      JOIN inventory i ON w.inv_id = i.inv_id
      WHERE w.account_id = $1
      ORDER BY w.created_at DESC`
    const data = await pool.query(sql, [account_id])
    return data.rows
  } catch (error) {
    console.error("getWishlistByAccountId error " + error)
  }
}

async function addWishlistItem(account_id, inv_id) {
  try {
    const sql = `INSERT INTO wishlist (account_id, inv_id)
      VALUES ($1, $2)
      ON CONFLICT (account_id, inv_id) DO NOTHING
      RETURNING *`
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("addWishlistItem error " + error)
  }
}

async function removeWishlistItem(account_id, inv_id) {
  try {
    const sql = "DELETE FROM wishlist WHERE account_id = $1 AND inv_id = $2 RETURNING *"
    const data = await pool.query(sql, [account_id, inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("removeWishlistItem error " + error)
  }
}

module.exports = {
  getWishlistByAccountId,
  addWishlistItem,
  removeWishlistItem
}
