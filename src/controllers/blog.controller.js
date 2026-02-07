import {
  createBlog as createBlogModel,
  getBlogs as getBlogsModel,
  getBlogById as getBlogByIdModel,
  updateBlog as updateBlogModel,
  deleteBlog as deleteBlogModel,
  countBlogs as countBlogsModel,
} from "../models/blog.model.js";
import { summarize } from "../utils/summarize.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content)
      return res.status(400).json({ message: "Title and content required" });

    const summary = summarize(content, 2);
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const id = await createBlogModel(title, content, summary, userId);
    res.status(201).json({ message: "Blog created", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      getBlogsModel(limit, offset),
      countBlogsModel(),
    ]);

    res.json({
      data: rows,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await getBlogByIdModel(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await getBlogByIdModel(id);
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    // only owner or admin
    const uid = String(req.user && req.user.id);
    if (req.user.role !== "ADMIN" && String(existing.user_id) !== uid) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, content } = req.body || {};
    if (!title && !content)
      return res.status(400).json({ message: "Nothing to update" });

    const newTitle = title || existing.title;
    const newContent = content || existing.content;
    const newSummary = summarize(newContent, 2);

    await updateBlogModel(id, newTitle, newContent, newSummary);
    res.json({ message: "Blog updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await getBlogByIdModel(id);
    if (!existing) return res.status(404).json({ message: "Blog not found" });

    // delete allowed only for ADMIN per spec
    if (req.user.role !== "ADMIN")
      return res.status(403).json({ message: "Forbidden" });

    await deleteBlogModel(id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
