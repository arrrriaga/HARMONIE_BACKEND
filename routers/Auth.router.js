const express = require("express");
const router = express.Router();

const { registro, login } = require("../controllers");
const upload = require("../middleware/upload");

router.post("/registro", registro);
router.post("/login", upload.single("picture"), login);

module.exports = router;
