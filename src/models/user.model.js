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

export const getAllUsers = async () => {
  const sql = "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC";
  const [rows] = await pool.query(sql);
  return rows;
};

export const getUserById = async (id) => {
  const sql = "SELECT id, name, email, role, created_at FROM users WHERE id = ?";
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};
