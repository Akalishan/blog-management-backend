export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
  next();
};

export const ownerOrAdmin = (idParam = "id") => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const userId = String(req.user.id);
  const paramId = String(req.params[idParam]);
  if (req.user.role === "ADMIN" || userId === paramId) return next();
  return res.status(403).json({ message: "Forbidden" });
};

export default requireRole;
