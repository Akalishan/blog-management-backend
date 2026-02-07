export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body || {};
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ message: "Name is required (min 2 chars)" });
  }
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  ) {
    return res.status(400).json({ message: "Valid email is required" });
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password is required (min 6 chars)" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  if (!email || typeof email !== "string")
    return res.status(400).json({ message: "Email is required" });
  if (!password || typeof password !== "string")
    return res.status(400).json({ message: "Password is required" });
  next();
};

export const validateBlogCreate = (req, res, next) => {
  const { title, content } = req.body || {};
  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({ message: "Title is required (min 3 chars)" });
  }
  if (!content || typeof content !== "string" || content.trim().length < 10) {
    return res
      .status(400)
      .json({ message: "Content is required (min 10 chars)" });
  }
  next();
};

export const validateBlogUpdate = (req, res, next) => {
  const { title, content } = req.body || {};
  if (!title && !content)
    return res
      .status(400)
      .json({ message: "Provide title or content to update" });
  if (title && (typeof title !== "string" || title.trim().length < 3)) {
    return res
      .status(400)
      .json({ message: "Title, if provided, must be min 3 chars" });
  }
  if (content && (typeof content !== "string" || content.trim().length < 10)) {
    return res
      .status(400)
      .json({ message: "Content, if provided, must be min 10 chars" });
  }
  next();
};

export const validateIdParam =
  (param = "id") =>
  (req, res, next) => {
    const val = req.params[param];
    if (!val || String(Number(val)) !== String(val))
      return res.status(400).json({ message: "Invalid id parameter" });
    next();
  };

export default null;
