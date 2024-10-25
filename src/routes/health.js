const express = require("express");
const router = express.Router();
const { healthcheck } = require("../controllers/healthController");

router.get("/health", healthcheck);

module.exports = router;
