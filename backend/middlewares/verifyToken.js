import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Company } from "../models/company.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Check token from cookie OR Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    let userOrCompany;

    if (decoded.role === "company") {
      userOrCompany = await Company.findById(decoded.companyId);
    } else {
      userOrCompany = await User.findById(decoded.userId);
    }

    if (!userOrCompany) {
      return res.status(401).json({ success: false, message: "User or Company not found" });
    }

    req.user = {
      id: userOrCompany._id,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized", error: error.message });
  }
};

export default verifyToken;
