const express = require("express");
const router = express.Router();
const adController = require("../controllers/ad");
const requestController = require("../controllers/request");
const auth = require("../middleware/auth");

router.get("/:id/requests", auth.authenticate, requestController.match);

router.post(
  "/",
  auth.authenticate,
  auth.restrictAccess("AGENT"),
  adController.createAd
);

module.exports = router;
