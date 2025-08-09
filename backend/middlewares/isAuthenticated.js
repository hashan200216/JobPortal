import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. No token.", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. User not found.", success: false });
    }

    req.user = user;
    req.id = user._id; // for admin routes
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default isAuthenticated;
