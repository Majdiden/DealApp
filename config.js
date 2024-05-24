if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports.server = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  port: process.env.PORT || 3000,
};

module.exports.db = {
  url: process.env.DB_URL || "",
};

module.exports.jwtToken = {
  secret: process.env.JWT_SECRET || "secret",
  expireIn: process.env.JWT_SECRET_EXPIRATION || "1d",
};
