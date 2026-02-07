import pool from "../config/db.js";

export const createUser = async (name, email, hashedPassword, role = "USER") => {
  const sql = `
    INSERT INTO users (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [
    name,
    email,
    hashedPassword,
    role,
  ]);
  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.query(sql, [email]);
  return rows[0];
};
