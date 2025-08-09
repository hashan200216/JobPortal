const companyAuth = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "company") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Auth failed" });
  }
};

export default companyAuth;
