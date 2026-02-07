import pool from "../config/db.js";

export const createBlog = async (title, content, summary, userId) => {
  const sql = `
    INSERT INTO blogs (title, content, summary, user_id)
    VALUES (?, ?, ?, ?)
  `;
  const [result] = await pool.query(sql, [title, content, summary, userId]);
  return result.insertId;
};

export const getBlogs = async (limit = 10, offset = 0) => {
  const sql = `SELECT b.id, b.title, b.summary, b.user_id, b.created_at, b.updated_at, u.name as author
    FROM blogs b
    JOIN users u ON u.id = b.user_id
    ORDER BY b.created_at DESC
    LIMIT ? OFFSET ?`;
  const [rows] = await pool.query(sql, [Number(limit), Number(offset)]);
  return rows;
};

export const getBlogById = async (id) => {
  const sql = `SELECT b.*, u.name as author FROM blogs b JOIN users u ON u.id = b.user_id WHERE b.id = ?`;
  const [rows] = await pool.query(sql, [id]);
  return rows[0];
};

export const updateBlog = async (id, title, content, summary) => {
  const sql = `UPDATE blogs SET title = ?, content = ?, summary = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const [result] = await pool.query(sql, [title, content, summary, id]);
  return result.affectedRows;
};

export const deleteBlog = async (id) => {
  const sql = `DELETE FROM blogs WHERE id = ?`;
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows;
};

export const countBlogs = async () => {
  const sql = `SELECT COUNT(*) as total FROM blogs`;
  const [rows] = await pool.query(sql);
  return rows[0].total;
};

export default {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  countBlogs,
};
