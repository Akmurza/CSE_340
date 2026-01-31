const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.on('connect', () => console.log('Connected to Render PostgreSQL'))
pool.on('error', (err) => console.error('Pool error:', err.message))

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      return res
    } catch (error) {
      console.error("query error:", { text, error: error.message })
      throw error
    }
  },
}