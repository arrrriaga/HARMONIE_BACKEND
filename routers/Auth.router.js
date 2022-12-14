const express = require("express");
const router = express.Router();

const { registro, login } = require("../controllers");

router.post("/signup", registro);
router.post("/login", login);

module.exports = router;
