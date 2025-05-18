const { login, register } = require("../Controllers/AuthController");

const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;
