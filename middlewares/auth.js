const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ success: false, message: "Access denied" });

  try {
    const verified = jwt.verify(token, "sunny");
    req.conductor = verified;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
