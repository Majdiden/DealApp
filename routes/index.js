const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const requestRoutes = require("./requests");
const adsRoutes = require("./ads");
const userRoutes = require("./users");

router.use("/auth", authRoutes);
router.use("/ads", adsRoutes);
router.use("/requests", requestRoutes);
router.use("/users", userRoutes);

module.exports = router;
