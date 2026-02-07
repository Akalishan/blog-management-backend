import express from "express";
import { listUsers, getUser } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole, ownerOrAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin only
router.get("/", authenticate, requireRole("ADMIN"), listUsers);

// Protected: owner or admin
router.get("/:id", authenticate, ownerOrAdmin("id"), getUser);

export default router;
