import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const seedAdmin = async () => {
  const email = "admin@blog.com";

  const [existing] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existing.length > 0) {
    console.log(" Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, 'ADMIN')`,
    ["Super Admin", email, hashedPassword]
  );

  console.log("Default ADMIN created");
};
