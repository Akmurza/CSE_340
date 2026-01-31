const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false   // ←
  }
});

// Отладка (можно потом убрать)
pool.on('connect', () => console.log('Успешно подключились к Render PostgreSQL'));
pool.on('error', (err) => console.error('Ошибка пула:', err.message));

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params);
      console.log("выполнен запрос:", { text });
      return res;
    } catch (error) {
      console.error("ошибка в запросе:", { text, error: error.message });
      throw error;
    }
  },
};