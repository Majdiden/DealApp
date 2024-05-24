const jwt = require("jsonwebtoken");
const UserRepository = require("../db/repositories/user");
const { jwtToken } = require("../config");

exports.authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtToken.secret);
    const user = await UserRepository.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

exports.restrictAccess = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role) && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
