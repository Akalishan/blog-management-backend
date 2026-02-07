import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import {
  validateBlogCreate,
  validateBlogUpdate,
  validateIdParam,
} from "../middleware/validate.middleware.js";

const router = express.Router();

// Create blog (protected)
router.post("/", authenticate, validateBlogCreate, createBlog);

// List blogs (public)
router.get("/", getBlogs);

// Get by id (public)
router.get("/:id", validateIdParam("id"), getBlogById);

// Update (owner or admin)
router.put(
  "/:id",
  authenticate,
  validateIdParam("id"),
  validateBlogUpdate,
  updateBlog,
);

// Delete (admin only)
router.delete("/:id", authenticate, validateIdParam("id"), deleteBlog);

export default router;
