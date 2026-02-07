import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create blog (protected)
router.post("/", authenticate, createBlog);

// List blogs (public)
router.get("/", getBlogs);

// Get by id (public)
router.get("/:id", getBlogById);

// Update (owner or admin)
router.put("/:id", authenticate, updateBlog);

// Delete (admin only)
router.delete("/:id", authenticate, deleteBlog);

export default router;
