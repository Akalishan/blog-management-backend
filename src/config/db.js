import 'dotenv/config';
import mysql from "mysql2/promise";

// Debugging: log whether env vars are present (don't print secrets).
console.log("DB config:", {
  host: process.env.DB_HOST || null,
  user: process.env.DB_USER || null,
  passwordSet: !!process.env.DB_PASSWORD,
  passwordLength: process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0,
  database: process.env.DB_NAME || null,
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
