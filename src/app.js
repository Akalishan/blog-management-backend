import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Blog Management API is running" });
});

export default app;
