const { Pool } = require("pg")
require("dotenv").config() // This line is for local dev, Render provides env vars directly.

let pool

if (process.env.NODE_ENV == "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // For local dev, may need to be true for some setups
    },
  })

  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("executed query", { text })
        return res
      } catch (error) {
        console.error("error in query", { text })
        throw error
      }
    },
  }
} else { // This block runs on Render
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // <--- ADD THIS LINE FOR RENDER
    },
  })
  module.exports = pool
}