require("dotenv").config()
const bcrypt = require("bcryptjs")
const pool = require("./database")

async function seedAccounts() {
  try {
    const accounts = [
      {
        account_firstname: "Basic",
        account_lastname: "Client",
        account_email: "basic@340.edu",
        account_password: "I@mABas1cCl!3nt",
        account_type: "Client",
      },
      {
        account_firstname: "Happy",
        account_lastname: "Employee",
        account_email: "happy@340.edu",
        account_password: "I@mAnEmpl0y33",
        account_type: "Employee",
      },
      {
        account_firstname: "Manager",
        account_lastname: "User",
        account_email: "manager@340.edu",
        account_password: "I@mAnAdm!n1strat0r",
        account_type: "Admin",
      },
    ]

    for (const account of accounts) {
      const hashedPassword = await bcrypt.hash(account.account_password, 10)
      const sql = `
        INSERT INTO account (
          account_firstname,
          account_lastname,
          account_email,
          account_password,
          account_type
        ) VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (account_email)
        DO UPDATE SET
          account_firstname = EXCLUDED.account_firstname,
          account_lastname = EXCLUDED.account_lastname,
          account_password = EXCLUDED.account_password,
          account_type = EXCLUDED.account_type
        RETURNING account_id;
      `
      await pool.query(sql, [
        account.account_firstname,
        account.account_lastname,
        account.account_email,
        hashedPassword,
        account.account_type,
      ])
    }

    console.log("Seeded basic, employee, and admin accounts.")
    process.exit(0)
  } catch (error) {
    console.error("Seed error:", error.message)
    process.exit(1)
  }
}

seedAccounts()
