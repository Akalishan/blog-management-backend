import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Missing Authorization header" });
  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Invalid Authorization format" });

  const parts = authHeader.split(" ");
  const token = parts.length === 2 ? parts[1] : parts[0];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticate;
