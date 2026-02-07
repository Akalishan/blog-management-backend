import { getAllUsers, getUserById } from "../models/user.model.js";

export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default { listUsers, getUser };
